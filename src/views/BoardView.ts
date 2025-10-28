import { lego } from '@armathai/lego';
import Matter from 'matter-js';
import { Container, IPointData, Rectangle, Texture } from 'pixi.js';
import { GAME_CONFIG, getBodyConfig, winningCombos } from '../configs/constants';
import { BoardModelEvents, GameModelEvents } from '../events/ModelEvents';
import { GameState } from '../models/GameModel';
import { ItemModel, ItemType } from '../models/ItemModel';
import { delayRunnable } from '../Utils';
import { ItemView } from './ItemView';

export class BoardView extends Container {
    private items: ItemView[] = [];
    private bodyToSprite: Map<any, ItemView> = new Map();
    constructor() {
        super();

        lego.event
            .on(GameModelEvents.StateUpdate, this.onGameStateUpdate, this)
            .on(BoardModelEvents.RocksUpdate, this.onRocksUpdate, this)
            .on(BoardModelEvents.ScissorsUpdate, this.onScissorsUpdate, this)
            .on(BoardModelEvents.PapersUpdate, this.onPapersUpdate, this);
        this.build();
    }

    public getBounds(): Rectangle {
        return new Rectangle(0, 0, GAME_CONFIG.width, GAME_CONFIG.height);
    }

    private initWalls(): void {
        const thickness = 100;
        const wallOptions = {
            isStatic: true,
            restitution: 1.02,
            friction: 0,
        };

        const { width: w, height: h } = GAME_CONFIG;
        const walls = [
            Matter.Bodies.rectangle(w / 2, -thickness / 2, w, thickness, wallOptions),
            Matter.Bodies.rectangle(w / 2, h + thickness / 2, w, thickness, wallOptions),
            Matter.Bodies.rectangle(-thickness / 2, h / 2, thickness, h, wallOptions),
            Matter.Bodies.rectangle(w + thickness / 2, h / 2, thickness, h, wallOptions),
        ];
        Matter.World.add(window.gamePhysicsWorld, walls);
    }

    private build(): void {
        this.initWalls();

        window.game.ticker.add(() => {
            for (const [body, sprite] of this.bodyToSprite) {
                sprite.x = body.position.x;
                sprite.y = body.position.y;
                sprite.rotation = body.angle;
            }
        });

        Matter.Events.on(window.gamePhysicsEngine, 'collisionStart', (event) => {
            for (const pair of event.pairs) {
                const { bodyA, bodyB } = pair;
                console.log(bodyA.label, bodyB.label);

                for (const [winner, { beats, texture }] of Object.entries(winningCombos)) {
                    if (
                        (bodyA.label === beats && bodyB.label === winner) ||
                        (bodyB.label === beats && bodyA.label === winner)
                    ) {
                        const loserBody = bodyA.label === beats ? bodyA : bodyB;
                        const loserSprite = this.bodyToSprite.get(loserBody);
                        loserBody.label = winner;
                        loserSprite && (loserSprite.sprite.texture = Texture.from(texture));
                        break;
                    }
                }
            }
        });
    }

    private onGameStateUpdate(state: GameState): void {
        switch (state) {
            case GameState.Intro:
                break;
            case GameState.Game:
                let i = 0;
                for (const [body, sprite] of this.bodyToSprite) {
                    delayRunnable((i % GAME_CONFIG.itemsCount) * 0.005, () => {
                        Matter.Body.setVelocity(body, {
                            x: (Math.random() - 0.5) * 10,
                            y: (Math.random() - 0.5) * 10,
                        });
                    });
                    i++;
                }
                break;
            case GameState.Result:
                break;

            default:
                break;
        }
    }

    private onRocksUpdate(items: ItemModel[]): void {
        const { rocksPosition: pos } = GAME_CONFIG;
        items.forEach(({ uuid, type }) => this.addNewItem(type, pos, uuid));
    }

    private onScissorsUpdate(items: ItemModel[]): void {
        const { scissorsPosition: pos } = GAME_CONFIG;
        items.forEach(({ uuid, type }) => this.addNewItem(type, pos, uuid));
    }

    private onPapersUpdate(items: ItemModel[]): void {
        const { papersPosition: pos } = GAME_CONFIG;
        items.forEach(({ uuid, type }) => this.addNewItem(type, pos, uuid));
    }

    private addNewItem(type: ItemType, pos: IPointData, uuid: string): void {
        const body = Matter.Bodies.circle(pos.x, pos.y, GAME_CONFIG.itemSize, getBodyConfig(type));
        const item = new ItemView(type, uuid);
        this.addChild(item);
        this.items.push(item);

        item.x = body.position.x;
        item.y = body.position.y;
        item.rotation = body.angle;
        this.bodyToSprite.set(body, item);
        Matter.World.add(window.gamePhysicsWorld, body);
    }
}
