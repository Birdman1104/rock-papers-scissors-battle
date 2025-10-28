import { Container, Sprite } from 'pixi.js';

export type ItemType = 'rock' | 'paper' | 'scissors';

export class Item extends Container {
    private _sprite!: Sprite;

    constructor(private _type: ItemType) {
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
}
