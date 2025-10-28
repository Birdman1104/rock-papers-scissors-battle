import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { Sprite } from 'pixi.js';
import { getUIGridConfig } from '../configs/gridConfigs/UIViewGC';
import { UIViewEvents } from '../events/MainEvents';
import { GameModelEvents } from '../events/ModelEvents';
import { GameState } from '../models/GameModel';
import { Counters } from './CountersView';

export class UIView extends PixiGrid {
    private startButton!: Sprite;
    private counter!: Counters;

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

        this.counter = new Counters();
        this.setChild('score', this.counter);
    }

    private onGameStateUpdate(state: GameState): void {
        switch (state) {
            case GameState.Intro:
                this.counter.visible = false;
                this.startButton.visible = true;
                this.startButton.eventMode = 'static';
                break;
            case GameState.Game:
                this.counter.visible = true;
                this.startButton.visible = false;
                this.startButton.eventMode = 'none';

                break;
            default:
                break;
        }
    }
}
