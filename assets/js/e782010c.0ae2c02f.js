(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{111:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return a})),n.d(t,"toc",(function(){return o})),n.d(t,"default",(function(){return c}));var r=n(3),i=(n(0),n(118));const l={title:"\u6e05\u6670\u5ea6\u5207\u6362"},a={unversionedId:"examples/quantity-switch",id:"examples/quantity-switch",isDocsHomePage:!1,title:"\u6e05\u6670\u5ea6\u5207\u6362",description:"\u8fd9\u4e2a\u4f8b\u5b50\u662f\u4f7f\u7528 ControlItem \u6765\u5b9e\u73b0\u89c6\u9891\u7684\u6e05\u6670\u5ea6\u5207\u6362\u529f\u80fd\uff0c\u6211\u4eec\u8fd9\u91cc\u4f7f\u7528 HLS\uff0c\u6765\u5207\u6362\u89c6\u9891\u6e05\u6670\u5ea6\u3002",source:"@site/docs/examples/quantity-switch.md",slug:"/examples/quantity-switch",permalink:"/docs/examples/quantity-switch",editUrl:"https://github.com/woopen/nplayer/edit/main/website/docs/examples/quantity-switch.md",version:"current",sidebar:"docs",previous:{title:"\u5f39\u5e55\u63d2\u4ef6",permalink:"/docs/ecosystem/danmaku"},next:{title:"\u89c6\u9891\u622a\u56fe",permalink:"/docs/examples/screenshot"}},o=[],s={toc:o};function c({components:e,...t}){return Object(i.b)("wrapper",Object(r.a)({},s,t,{components:e,mdxType:"MDXLayout"}),Object(i.b)("p",null,"\u8fd9\u4e2a\u4f8b\u5b50\u662f\u4f7f\u7528 ",Object(i.b)("inlineCode",{parentName:"p"},"ControlItem")," \u6765\u5b9e\u73b0\u89c6\u9891\u7684\u6e05\u6670\u5ea6\u5207\u6362\u529f\u80fd\uff0c\u6211\u4eec\u8fd9\u91cc\u4f7f\u7528 HLS\uff0c\u6765\u5207\u6362\u89c6\u9891\u6e05\u6670\u5ea6\u3002"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-js"},"import Player from 'nplayer'\nimport Hls from 'hls'\n\n// 1. \u9996\u5148\u521b\u5efa\u4e00\u4e2a\u63a7\u5236\u6761\u9879\nconst QuantitySwitch = {\n  init(container, player) {\n    this.element = container.appendChild(document.createElement('div'))\n    this.btn = document.createElement('div')\n    this.btn.textContent = '\u753b\u8d28'\n    this.element.appendChild(this.btn)\n    this.popover = new player.Player.components.Popover(this.element)\n    this.btn.addEventListener('click', (ev) => {\n      this.popover.show()\n      // \u70b9\u51fb\u6309\u94ae\u7684\u65f6\u5019\u5c55\u793a popover\n    })\n    this.element.style.display = 'none'\n    // \u9ed8\u8ba4\u9690\u85cf\uff0c\u56e0\u4e3a\u6709\u53ef\u80fd\u5f53\u524d\u89c6\u9891\u6ca1\u6709\u591a\u4e2a\u6e05\u6670\u5ea6\n    this.element.classList.add('quantity')\n  }\n}\n\n// 2. \u6211\u4eec\u628a\u5b83\u653e\u5230 airplay \u540e\u9762\nconst player = new Player({\n  controls: ['play', 'volume', 'time', 'spacer', 'airplay', QuantitySwitch, 'settings', 'web-fullscreen', 'fullscreen'],\n})\n\n// 3. \u521b\u5efa HLS \u5b9e\u4f8b\nconst hls = new Hls()\nhls.attachMedia(player.video)\n\nhls.on(Hls.Events.MEDIA_ATTACHED, function () {\n  // \u7ed1\u5b9a video \u5143\u7d20\u6210\u529f\u7684\u65f6\u5019\uff0c\u53bb\u52a0\u8f7d\u89c6\u9891\n  hls.loadSource('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8')\n  hls.on(Hls.Events.MANIFEST_PARSED, function () {\n    if (hls.levels.length <= 1) {\n      // \u53ea\u6709\u4e00\u4e2a\u6e05\u6670\u5ea6\u7684\u65f6\u5019\u9690\u85cf \u5207\u6362\u6309\u94ae\n      QuantitySwitch.element.style.display = 'none'\n      return\n    }\n    // 4. \u7ed9\u6e05\u6670\u5ea6\u6392\u5e8f\uff0c\u6e05\u6670\u5ea6\u8d8a\u9ad8\u7684\u6392\u5728\u6700\u524d\u9762\n    hls.levels.sort((a, b) => b.height - a.height)\n    const frag = document.createDocumentFragment()\n    // 5. \u7ed9\u4e0e\u6e05\u6670\u5ea6\u5bf9\u5e94\u7684\u5143\u7d20\u6dfb\u52a0\uff0c\u70b9\u51fb\u5207\u6362\u6e05\u6670\u5ea6\u529f\u80fd\n    const listener = (i) => (init) => {\n      const el = QuantitySwitch.itemElements[i] || QuantitySwitch.itemElements[QuantitySwitch.itemElements.length - 1]\n      if (el) {\n        QuantitySwitch.btn.textContent = el.textContent \n        // \u5c06\u5c55\u5f00\u6e05\u6670\u5ea6\u6309\u94ae\u6362\u6210\u5f53\u524d\u9009\u62e9\u6e05\u6670\u5ea6\n        if (init !== true && !player.paused) setTimeout(() => player.play())\n        // \u56e0\u4e3a HLS \u5207\u6362\u6e05\u6670\u5ea6\u4f1a\u4f7f\u6b63\u5728\u64ad\u653e\u7684\u89c6\u9891\u6682\u505c\uff0c\u6211\u4eec\u8fd9\u91cc\u8ba9\u5b83\u518d\u81ea\u52a8\u6062\u590d\u64ad\u653e\n        hls.currentLevel = i\n        hls.loadLevel = i\n        // \u8bbe\u7f6e hls \u5f53\u524d\u6e05\u6670\u5ea6\n      }\n      QuantitySwitch.popover.hide()\n      // \u9690\u85cf\u6e05\u6670\u5ea6\u9009\u62e9\u83dc\u5355\u9879\u76ee\n    }\n    // 6. \u6dfb\u52a0\u6e05\u6670\u5ea6\u5bf9\u5e94\u5143\u7d20\n    QuantitySwitch.itemElements = hls.levels.map((l, i) => {\n      const el = document.createElement('div')\n      el.textContent = l.name + 'P'\n      if (l.height === 1080) el.textContent += ' \u8d85\u6e05'\n      if (l.height === 720) el.textContent += ' \u9ad8\u6e05'\n      if (l.height === 480) el.textContent += ' \u6e05\u6670'\n      el.classList.add('quantity_item')\n      el.addEventListener('click', listener(i))\n      frag.appendChild(el)\n      return el\n    })\n    // \u5c06\u6e05\u6670\u5ea6\u6dfb\u52a0 popover \u4e2d\n    const el = document.createElement('div')\n    el.textContent = '\u81ea\u52a8'\n    el.addEventListener('click', listener(-1))\n    el.classList.add('quantity_item')\n    // \u8fd9\u91cc\u518d\u6dfb\u52a0\u4e00\u4e2a `\u81ea\u52a8` \u9009\u9879\uff0cHLS \u9ed8\u8ba4\u662f\u6839\u636e\u7f51\u901f\u81ea\u52a8\u5207\u6362\u6e05\u6670\u5ea6\n    frag.appendChild(el)\n    QuantitySwitch.itemElements.push(el)\n\n    QuantitySwitch.popover.panelElement.appendChild(frag)\n    QuantitySwitch.element.style.display = 'block'\n    // \u663e\u793a\u8be5\u63a7\u5236\u9879\n\n    listener(hls.currentLevel)(true)\n    // \u521d\u59cb\u5316\u5f53\u524d\u6e05\u6670\u5ea6\n  })\n})\n")))}c.isMDXComponent=!0},118:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return h}));var r=n(0),i=n.n(r);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=i.a.createContext({}),p=function(e){var t=i.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=p(e.components);return i.a.createElement(c.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},d=i.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,a=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=p(n),d=r,h=u["".concat(a,".").concat(d)]||u[d]||m[d]||l;return n?i.a.createElement(h,o(o({ref:t},c),{},{components:n})):i.a.createElement(h,o({ref:t},c))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,a=new Array(l);a[0]=d;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:r,a[1]=o;for(var c=2;c<l;c++)a[c]=n[c];return i.a.createElement.apply(null,a)}return i.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);