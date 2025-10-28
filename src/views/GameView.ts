import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { getGameViewGridConfig } from '../configs/gridConfigs/GameViewGC';
import { GameModelEvents } from '../events/ModelEvents';
import { BoardView } from './BoardView';

export class GameView extends PixiGrid {
    private board;
    constructor() {
        super();

        lego.event.on(GameModelEvents.BoardUpdate, this.onBoardUpdate, this);
        this.build();
    }

    public getGridConfig(): ICellConfig {
        return getGameViewGridConfig();
    }

    public rebuild(config?: ICellConfig | undefined): void {
        super.rebuild(this.getGridConfig());
    }

    private build(): void {
        //
    }

    private onBoardUpdate(): void {
        const board = new BoardView();
        this.setChild('board', board);
    }
}
