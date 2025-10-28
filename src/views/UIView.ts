import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { Sprite } from 'pixi.js';
import { getUIGridConfig } from '../configs/gridConfigs/UIViewGC';
import { UIViewEvents } from '../events/MainEvents';
import { GameModelEvents } from '../events/ModelEvents';
import { GameState } from '../models/GameModel';

export class UIView extends PixiGrid {
    private startButton!: Sprite;

    constructor() {
        super();

        lego.event.on(GameModelEvents.StateUpdate, this.onGameStateUpdate, this);
        this.build();
    }

    public getGridConfig(): ICellConfig {
        return getUIGridConfig();
    }

    public rebuild(config?: ICellConfig | undefined): void {
        super.rebuild(this.getGridConfig());
    }

    private build(): void {
        this.startButton = Sprite.from('start.png');
        this.startButton.eventMode = 'static';
        this.startButton.on('pointerdown', () => {
            lego.event.emit(UIViewEvents.StartButtonClick);
        });
        this.setChild('start', this.startButton);
    }

    private onGameStateUpdate(state: GameState): void {
        console.warn(GameState[state]);

        this.startButton.visible = state === GameState.Intro;
        this.startButton.eventMode = state === GameState.Intro ? 'static' : 'none';
    }
}
