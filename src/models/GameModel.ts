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
    private _board: BoardModel | null = null;

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

    get board(): BoardModel | null {
        return this._board;
    }

    set board(value: BoardModel) {
        this._board = value;
    }

    public setState(state: GameState): void {
        this.state = state;
    }

    public init(): void {
        this._state = GameState.Intro;
        this._board = new BoardModel();
    }

    public initElements(): void {
        this._board?.initElements();
    }
}
