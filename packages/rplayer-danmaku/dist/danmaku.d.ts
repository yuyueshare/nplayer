import RPlayer from 'rplayer';
import { Item, DanmakuOpts } from './options';
import UI from './ui';
export default class Danmaku {
    ui: UI;
    readonly dom: HTMLElement;
    readonly opts: DanmakuOpts;
    player: RPlayer;
    private tunnel;
    fontSize: number;
    private opacity;
    tunnelHeight: number;
    private area;
    private unlimited;
    private showing;
    private running;
    private timer;
    private remain;
    private current;
    private last;
    private pool;
    private top;
    private bottom;
    private prevCurrentTime;
    constructor(opts: DanmakuOpts);
    install(player: RPlayer): void;
    private onPlayerSeeked;
    updateTunnelHeight(h: number): void;
    private updateTunnel;
    updateArea(area: number): void;
    updateOpacity(opacity: number): void;
    updateFontSize(fontSize: number): void;
    updateScrollFrame(scrollFrame?: number): void;
    updateStaticFrame(staticFrame?: number): void;
    private getFontSize;
    hide(): void;
    show(): void;
    clear(): void;
    toggleBlockType(type: string): void;
    send(item: Item): void;
    push(item: Item[] | Item): void;
    private getDan;
    private recycleDan;
    private pause;
    private getShortestTunnel;
    private insert;
    private load;
    private fire;
    private clean;
    private update;
    private render;
    private run;
}
//# sourceMappingURL=danmaku.d.ts.map