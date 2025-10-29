import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { Sprite } from 'pixi.js';
import { getUIGridConfig } from '../configs/gridConfigs/UIViewGC';
import { UIViewEvents } from '../events/MainEvents';
import { GameModelEvents } from '../events/ModelEvents';
import { GameState } from '../models/GameModel';
import { ItemType } from '../models/ItemModel';
import { hide, show } from '../Utils';
import { Counters } from './CountersView';
import { WinnerPopup } from './WinnerPopup';

export class UIView extends PixiGrid {
    private startButton!: Sprite;
    private restartButton!: Sprite;
    private counter!: Counters;
    private winnerPopup!: WinnerPopup;

    constructor() {
        super();

        lego.event
            .on(GameModelEvents.StateUpdate, this.onGameStateUpdate, this)
            .on(GameModelEvents.WinnerUpdate, this.onWinnerUpdate, this);

        this.build();
    }

    public getGridConfig(): ICellConfig {
        return getUIGridConfig();
    }

    public rebuild(config?: ICellConfig | undefined): void {
        super.rebuild(this.getGridConfig());
    }

    private build(): void {
        this.buildStartButton();
        this.buildRestartButton();
        this.buildCounters();
        this.buildPopup();
    }

    private buildStartButton(): void {
        this.startButton = Sprite.from('start.png');
        this.startButton.eventMode = 'static';
        this.startButton.on('pointerdown', () => {
            lego.event.emit(UIViewEvents.StartButtonClick);
        });
        this.setChild('start', this.startButton);
    }

    private buildRestartButton(): void {
        this.restartButton = Sprite.from('restart.png');
        this.restartButton.on('pointerdown', () => {
            lego.event.emit(UIViewEvents.RestartButtonClick);
        });
        hide(this.restartButton, true);
        this.setChild('start', this.restartButton);
    }

    private buildCounters(): void {
        this.counter = new Counters();
        hide(this.counter, true);
        this.setChild('score', this.counter);
    }

    private buildPopup(): void {
        this.winnerPopup = new WinnerPopup();
        hide(this.winnerPopup, true);
        this.setChild('popup', this.winnerPopup);
    }

    private onGameStateUpdate(state: GameState): void {
        switch (state) {
            case GameState.Intro:
                this.enableButton(this.startButton);
                this.disableButton(this.restartButton);
                hide(this.winnerPopup);
                break;
            case GameState.Game:
                this.disableButton(this.startButton);
                show(this.counter);

                break;
            case GameState.Result:
                hide(this.counter);
                show(this.winnerPopup);
                this.enableButton(this.restartButton);
                break;
            default:
                break;
        }
    }

    private onWinnerUpdate(winner: ItemType): void {
        if (winner) {
            this.winnerPopup.updateWinningItem(winner + '.png');
        }
    }

    private enableButton(button: Sprite): void {
        show(button);
        button.eventMode = 'static';
    }

    private disableButton(button: Sprite): void {
        hide(button);
        button.eventMode = 'none';
    }
}
