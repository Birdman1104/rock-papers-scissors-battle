import { ObservableModel } from './ObservableModel';

export type ItemType = 'rock' | 'paper' | 'scissors';

export class ItemModel extends ObservableModel {
    constructor(private _type: ItemType) {
        super('ItemModel');

        this.makeObservable();
    }

    public get type(): ItemType {
        return this._type;
    }

    public set type(value: ItemType) {
        this._type = value;
    }
}
