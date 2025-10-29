import { Container, Sprite, Texture } from 'pixi.js';

export class WinnerPopup extends Container {
    private bkg!: Sprite;
    private winningItem!: Sprite;
    constructor() {
        super();

        this.build();
    }

    public updateWinningItem(textureName: string): void {
        this.winningItem.texture = Texture.from(textureName);
    }

    private build(): void {
        this.bkg = Sprite.from('popup.png');
        this.winningItem = Sprite.from('rock.png');
        this.winningItem.position.set(152, 183);
        this.addChild(this.bkg, this.winningItem);
    }
}
