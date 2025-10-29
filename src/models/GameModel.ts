import { BoardModel } from './BoardModel';
import { ItemType } from './ItemModel';
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
    private _winner: ItemType | undefined = undefined;

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

    get winner(): ItemType | undefined {
        return this._winner;
    }

    set winner(value: ItemType) {
        this._winner = value;
    }

    public setState(state: GameState): void {
        this.state = state;
    }

    public setWinner(winner: ItemType | undefined): void {
        this._winner = winner;
    }

    public init(): void {
        this._state = GameState.Intro;
        this._board = new BoardModel();
    }

    public initItems(): void {
        this._board?.initItems();
    }

    public restart() {
        this.setState(GameState.Intro);
    }
}
