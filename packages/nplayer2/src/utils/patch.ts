import { removeNode } from './dom';

export interface Node {
  id?: any;
  el?: HTMLElement;
}

function isSameNode(a: Node, b: Node) {
  if (!a || !b) return false;
  return a === b || a.id === b.id;
}

function unmount(node: Node, unmountNode?: (n: Node) => void) {
  if (node.el) removeNode(node.el);
  if (unmountNode) unmountNode(node);
}

function mountOrMove(node: Node, container: HTMLElement, anchor?: Node, op?:(n: Node, pos: number) => void, pos?: number) {
  if (node.el) container.insertBefore(node.el, anchor?.el || null);
  if (op) op(node, pos as number);
}

function lis(arr: number[]): number[] {
  const p: number[] = [];
  const m = [arr[0]];
  let lo = 0;
  let hi = 0;
  let mid = 0;
  let last = 0;

  for (let i = 1, l = arr.length, item; i < l; ++i) {
    item = arr[i];
    if (item !== -1) {
      last = m.length - 1;
      if (item > arr[m[last]]) {
        p[i] = m[last];
        m.push(i);
      } else {
        lo = 0;
        hi = last;
        while (lo < hi) {
          mid = ((lo + hi) / 2) | 0;
          if (item > arr[m[mid]]) {
            lo = mid + 1;
          } else {
            hi = mid;
          }
        }
        p[i] = m[lo - 1];
        m[lo] = i;
      }
    }
  }

  last = m.length;
  lo = m[last - 1];
  while (last-- > 0) {
    m[last] = lo;
    lo = p[lo];
  }

  return m;
}

export function patch(
  prevNodes: Node[],
  nextNodes: Node[],
  container: HTMLElement,
  op: {
    mount?: (node: Node, pos: number) => void;
    update?: (node: Node, pos: number) => void;
    unmount?: (node: Node) => void;
  } = {},
) {
  let prevEnd = prevNodes.length - 1;
  let nextEnd = nextNodes.length - 1;
  let startIndex = 0;
  let prevNode = prevNodes[startIndex];
  let nextNode = nextNodes[startIndex];

  while (isSameNode(prevNode, nextNode)) {
    startIndex++;
    prevNode = prevNodes[startIndex];
    nextNode = nextNodes[startIndex];
  }

  if (startIndex < prevEnd && startIndex < nextEnd) {
    prevNode = prevNodes[prevEnd];
    nextNode = nextNodes[nextEnd];

    while (isSameNode(prevNode, nextNode)) {
      prevNode = prevNodes[--prevEnd];
      nextNode = nextNodes[--nextEnd];
    }
  }

  if (startIndex > prevEnd && startIndex > nextEnd) return;

  if (startIndex > prevEnd) {
    for (let i = startIndex; i <= nextEnd; i++) {
      mountOrMove(nextNodes[i], container, undefined, op.mount, i);
    }
  } else if (startIndex > nextEnd) {
    for (let i = startIndex; i <= prevEnd; i++) {
      unmount(prevNodes[i], op.unmount);
    }
  } else {
    const toPatch = [];
    const idMap = new Map<any, number>();
    for (let i = startIndex; i <= nextEnd; i++) {
      toPatch.push(-1);
      idMap.set(nextNodes[i].id || nextNodes[i], i);
    }

    let moved = false;
    let prevPos = 0;
    let nextIndex = 0;
    for (let i = startIndex; i <= prevEnd; i++) {
      prevNode = prevNodes[i];
      nextIndex = idMap.get(prevNode.id || prevNode) as any;

      if (nextIndex == null) {
        unmount(prevNode, op.unmount);
      } else {
        toPatch[nextIndex - startIndex] = i;

        if (prevPos > nextIndex) {
          moved = true;
        } else {
          prevPos = nextIndex;
        }
      }
    }

    const incSeq = moved ? lis(toPatch) : [];
    let j = incSeq.length - 1;
    for (let i = toPatch.length - 1, item, anchor; i > -1; i--) {
      item = toPatch[i];
      nextIndex = startIndex + i;
      anchor = nextNodes[nextIndex + 1];
      if (item === -1) {
        mountOrMove(nextNodes[nextIndex], container, anchor, op.mount, nextIndex);
      } else if (moved) {
        if (i === incSeq[j]) {
          j--;
        } else {
          mountOrMove(nextNodes[nextIndex], container, anchor, op.update, nextIndex);
        }
      }
    }
  }
}
