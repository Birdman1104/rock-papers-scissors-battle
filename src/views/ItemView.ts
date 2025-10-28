import { Container, Sprite } from 'pixi.js';
import { ItemType } from '../models/ItemModel';

export class ItemView extends Container {
    private _sprite!: Sprite;

    constructor(private _type: ItemType, private _uuid: string) {
        super();

        this._sprite = Sprite.from(this.type + '.png');
        this._sprite.anchor.set(0.5);
        this._sprite.scale.set(50 / this._sprite.width);
        this.addChild(this._sprite);
    }

    get type(): ItemType {
        return this._type;
    }

    get sprite(): Sprite {
        return this._sprite;
    }

    get uuid(): string {
        return this._uuid;
    }
}
