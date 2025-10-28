import { BoardModel } from './BoardModel';
import { ObservableModel } from './ObservableModel';

export enum GameState {
    Unknown,
    Intro,
    Game,
    Result,
}

export class GameModel extends ObservableModel {
    private _state: GameState;
    private _board: BoardModel;

    constructor() {
        super('GameModel');

        this._state = GameState.Unknown;
        this.makeObservable();
    }

    get state(): GameState {
        return this._state;
    }

    set state(value: GameState) {
        this._state = value;
    }

    get board(): BoardModel {
        return this._board;
    }

    set board(value: BoardModel) {
        this._board = value;
    }

    public init(): void {
        this._state = GameState.Unknown;
        this._board = new BoardModel();
        this._board.init();
    }
}
