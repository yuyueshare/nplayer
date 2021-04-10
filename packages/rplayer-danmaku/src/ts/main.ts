import type { Plugin as P, Player } from 'rplayer';
import { Danmaku, DanmakuOptions } from './danmaku';
import { DanmakuSendBoxControlItem } from './send-box';
import { DanmakuSettingControlItem } from './setting';
import { trans } from './utils';

export class Plugin implements P {
  private opts: DanmakuOptions;

  constructor(opts: DanmakuOptions) {
    this.opts = opts;
  }

  apply(player: Player) {
    player.registerControlItem(DanmakuSendBoxControlItem);
    player.registerControlItem(DanmakuSettingControlItem);

    player.Player.I18n.add('zh-CN', trans);
    player.danmaku = new Danmaku(player, this.opts);

    player.opts.controls.splice(3, 1, 'danmaku', 'danmaku-setting');
  }
}