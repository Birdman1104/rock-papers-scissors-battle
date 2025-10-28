import { GAME_CONFIG } from '../configs/constants';
import { ItemModel } from './ItemModel';
import { ObservableModel } from './ObservableModel';

export class BoardModel extends ObservableModel {
    private _rocks: ItemModel[] = [];
    private _papers: ItemModel[] = [];
    private _scissors: ItemModel[] = [];

    constructor() {
        super('BoardModel');

        this.makeObservable();
    }

    public get rocks(): ItemModel[] {
        return this._rocks;
    }

    public get papers(): ItemModel[] {
        return this._papers;
    }

    public get scissors(): ItemModel[] {
        return this._scissors;
    }

    public set rocks(value: ItemModel[]) {
        this._rocks = value;
    }

    public set papers(value: ItemModel[]) {
        this._papers = value;
    }

    public set scissors(value: ItemModel[]) {
        this._scissors = value;
    }

    public init(): void {
        const { itemsCount } = GAME_CONFIG;
        this._rocks = new Array(itemsCount).fill(new ItemModel('rock'));
        this._papers = new Array(itemsCount).fill(new ItemModel('paper'));
        this._scissors = new Array(itemsCount).fill(new ItemModel('scissors'));
    }
}
