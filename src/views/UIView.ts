import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { Sprite } from 'pixi.js';
import { getUIGridConfig } from '../configs/gridConfigs/UIViewGC';

export class UIView extends PixiGrid {
    private startButton!: Sprite;

    constructor() {
        super();
        this.build();
    }

    public getGridConfig(): ICellConfig {
        return getUIGridConfig();
    }

    public rebuild(config?: ICellConfig | undefined): void {
        super.rebuild(this.getGridConfig());
    }

    private build(): void {
        this.startButton = Sprite.from('start.png');
        this.startButton.eventMode = 'static';
        this.startButton.on('pointerdown', () => {
            console.warn('click');
        });
        this.setChild('start', this.startButton);
    }
}
