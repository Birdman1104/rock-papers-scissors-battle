import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { Sprite } from 'pixi.js';
import { getBackgroundGridConfig } from '../configs/gridConfigs/BackgroundViewGC';
import { GameModelEvents } from '../events/ModelEvents';
import { GameState } from '../models/GameModel';
import { hide, show } from '../Utils';

export class BackgroundView extends PixiGrid {
    private bkg!: Sprite;
    constructor() {
        super();

        lego.event.on(GameModelEvents.StateUpdate, this.onGameStateUpdate, this);

        this.build();
    }

    public getGridConfig(): ICellConfig {
        return getBackgroundGridConfig();
    }

    public rebuild(config?: ICellConfig | undefined): void {
        super.rebuild(this.getGridConfig());
    }

    private build(): void {
        this.bkg = Sprite.from('bkg.jpg');
        this.setChild('bkg', this.bkg);
    }

    private onGameStateUpdate(state: GameState): void {
        switch (state) {
            case GameState.Intro:
                show(this.bkg);
                break;
            case GameState.Game:
                hide(this.bkg);
                break;
            case GameState.Result:
                hide(this.bkg);
                break;
            default:
                break;
        }
    }
}
