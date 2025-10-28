import { GAME_CONFIG } from '../configs/constants';
import { ItemModel, ItemType } from './ItemModel';
import { ObservableModel } from './ObservableModel';

export class BoardModel extends ObservableModel {
    private _items: ItemModel[] = [];

    private _rocksCounter = 0;
    private _papersCounter = 0;
    private _scissorsCounter = 0;

    constructor() {
        super('BoardModel');

        this.makeObservable();
    }

    public get rocks(): ItemModel[] {
        return this._items.filter((el) => el.type === 'rock');
    }

    public get papers(): ItemModel[] {
        return this._items.filter((el) => el.type === 'paper');
    }

    public get scissors(): ItemModel[] {
        return this._items.filter((el) => el.type === 'scissors');
    }

    public get items(): ItemModel[] {
        return this._items;
    }

    public set items(value: ItemModel[]) {
        this.items = value;
    }

    public get rocksCounter(): number {
        return this._rocksCounter;
    }

    public get papersCounter(): number {
        return this._papersCounter;
    }

    public get scissorsCounter(): number {
        return this._scissorsCounter;
    }

    public set rocksCounter(value: number) {
        this._rocksCounter = value;
    }

    public set papersCounter(value: number) {
        this._papersCounter = value;
    }

    public set scissorsCounter(value: number) {
        this._scissorsCounter = value;
    }

    public getItemByUuid(uuid: string): ItemModel | undefined {
        return this._items.find((el) => el.uuid === uuid);
    }

    public init(): void {
        //
    }

    public initItems(): void {
        this._items.forEach((r) => r.destroy());
        const tempArr: ItemModel[] = [];
        const types: ItemType[] = ['rock', 'paper', 'scissors'];
        const { itemsCount } = GAME_CONFIG;
        types.forEach((type) => {
            for (let i = 0; i < itemsCount; i++) {
                tempArr.push(new ItemModel(type));
            }
        });

        this._items = [...tempArr];
    }

    public updateItem(uuid: string, turnInto: ItemType): void {
        const item = this.getItemByUuid(uuid);
        if (item) {
            item.type = turnInto;
        }
    }

    public onTypeUpdate(): void {
        this._rocksCounter = this.rocks.length;
        this._papersCounter = this.papers.length;
        this._scissorsCounter = this.scissors.length;
    }
}
