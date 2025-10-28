import { lego } from '@armathai/lego';
import Matter from 'matter-js';
import { Container, IPointData, Rectangle, Texture } from 'pixi.js';
import { GAME_CONFIG, getBodyConfig, wallBodyConfig, winningCombos } from '../configs/constants';
import { MainGameEvents } from '../events/MainEvents';
import { BoardModelEvents, GameModelEvents, ItemModelEvents } from '../events/ModelEvents';
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
            .on(ItemModelEvents.TypeUpdate, this.onItemTypeUpdate, this)
            .on(GameModelEvents.StateUpdate, this.onGameStateUpdate, this)
            .on(BoardModelEvents.ItemsUpdate, this.onItemsUpdate, this);
        this.build();
    }

    public getBounds(): Rectangle {
        return new Rectangle(0, 0, GAME_CONFIG.width, GAME_CONFIG.height);
    }

    private initWalls(): void {
        const thickness = 100;

        const { width: w, height: h } = GAME_CONFIG;
        const walls = [
            Matter.Bodies.rectangle(w / 2, -thickness / 2, w, thickness, wallBodyConfig),
            Matter.Bodies.rectangle(w / 2, h + thickness / 2, w, thickness, wallBodyConfig),
            Matter.Bodies.rectangle(-thickness / 2, h / 2, thickness, h, wallBodyConfig),
            Matter.Bodies.rectangle(w + thickness / 2, h / 2, thickness, h, wallBodyConfig),
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
                for (const [winner, { beats, texture }] of Object.entries(winningCombos)) {
                    if (
                        (bodyA.label === beats && bodyB.label === winner) ||
                        (bodyB.label === beats && bodyA.label === winner)
                    ) {
                        const loserBody = bodyA.label === beats ? bodyA : bodyB;
                        const loserSprite = this.bodyToSprite.get(loserBody);
                        loserBody.label = winner;
                        if (loserSprite) {
                            loserSprite.sprite.texture = Texture.from(texture);
                            lego.event.emit(MainGameEvents.Collision, loserSprite.uuid, winner);
                        }
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

    private onItemsUpdate(items: ItemModel[]): void {
        items.forEach(({ uuid, type }) => {
            this.addNewItem(type, GAME_CONFIG.positions[type], uuid);
        });
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

    private onItemTypeUpdate(newType: ItemType, oldType: ItemType, uuid: string) {
        // console.log(oldType, '->', newType);
        // const item = this.items.find((item) => item.uuid === uuid);
        // if (item) {
        //     loserBody.label = newType;
        //     item.sprite.texture = Texture.from(newType + '.png');
        //     // loserSprite && (loserSprite.sprite.texture = Texture.from(texture));
        // }
    }
}
