import { lego } from '@armathai/lego';
import { Container, Rectangle, Text } from 'pixi.js';
import { GAME_CONFIG } from '../configs/constants';
import { BoardModelEvents } from '../events/ModelEvents';
import { makeText } from '../Utils';

const getTextStyle = (y: number, text: string): TextConfig => {
    return {
        text,
        y,
        x: 10,
        anchor: { x: 0, y: 0 },
        style: {
            fontSize: 28,
            fill: '#ffffff',
            // fontFamily: 'JomhuriaRegular',
            letterSpacing: 1,
        },
    };
};

export class Counters extends Container {
    private rocksText!: Text;
    private papersText!: Text;
    private scissorsText!: Text;

    constructor() {
        super();

        lego.event
            .on(BoardModelEvents.RocksCounterUpdate, this.onRocksCounterUpdate, this)
            .on(BoardModelEvents.PapersCounterUpdate, this.onPapersCounterUpdate, this)
            .on(BoardModelEvents.ScissorsCounterUpdate, this.onScissorsCounterUpdate, this);

        this.build();
    }

    public getBounds(skipUpdate?: boolean, rect?: Rectangle): Rectangle {
        return new Rectangle(0, 0, 200, 100);
    }

    private build(): void {
        this.rocksText = makeText(getTextStyle(0, 'Rocks - ' + GAME_CONFIG.itemsCount));
        this.papersText = makeText(getTextStyle(35, 'Papers - ' + GAME_CONFIG.itemsCount));
        this.scissorsText = makeText(getTextStyle(70, 'Scissors - ' + GAME_CONFIG.itemsCount));

        this.addChild(this.rocksText, this.papersText, this.scissorsText);
    }

    private onRocksCounterUpdate(value: number): void {
        this.rocksText.text = 'Rocks - ' + value;
    }

    private onPapersCounterUpdate(value: number): void {
        this.papersText.text = 'Papers - ' + value;
    }

    private onScissorsCounterUpdate(value: number): void {
        this.scissorsText.text = 'Scissors - ' + value;
    }
}
