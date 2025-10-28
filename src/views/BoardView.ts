import { lego } from '@armathai/lego';
import Matter from 'matter-js';
import { Container, IPointData, Rectangle } from 'pixi.js';
import { GAME_CONFIG, ItemBodyConfig } from '../configs/constants';
import { BoardModelEvents } from '../events/ModelEvents';
import { ItemModel, ItemType } from '../models/ItemModel';
import { ItemView } from './ItemView';

export class BoardView extends Container {
    private items: ItemView[] = [];
    private bodyToSprite: Map<any, ItemView> = new Map();
    constructor() {
        super();

        lego.event
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

        // for (let i = 0; i < 30; i++) {
        //     const name = i % 3 === 0 ? 'rock' : i % 3 === 1 ? 'paper' : 'scissors';
        //     const size = 25;
        //     const x = Math.random() * (WIDTH - 100) + 50;
        //     const y = Math.random() * (HEIGHT - 100) + 50;

        //     const body = Matter.Bodies.circle(x, y, size, {
        //         restitution: 1.02,
        //         friction: 0,
        //         frictionAir: 0,
        //         label: name,
        //     });

        //     Matter.Body.setVelocity(body, {
        //         x: (Math.random() - 0.5) * 10,
        //         y: (Math.random() - 0.5) * 10,
        //     });

        //     const item = new ItemView(name, '');
        //     this.addChild(item);

        //     bodyToSprite.set(body, item);
        //     Matter.World.add(window.gamePhysicsWorld, body);
        // }

        // window.game.ticker.add(() => {
        //     for (const [body, sprite] of bodyToSprite) {
        //         sprite.x = body.position.x;
        //         sprite.y = body.position.y;
        //         sprite.rotation = body.angle;
        //     }
        // });

        // const winningCombos = {
        //     paper: { beats: 'rock', texture: 'paper.png' },
        //     rock: { beats: 'scissors', texture: 'rock.png' },
        //     scissors: { beats: 'paper', texture: 'scissors.png' },
        // };

        // Matter.Events.on(window.gamePhysicsEngine, 'collisionStart', (event) => {
        //     for (const pair of event.pairs) {
        //         const { bodyA, bodyB } = pair;

        //         for (const [winner, { beats, texture }] of Object.entries(winningCombos)) {
        //             if (
        //                 (bodyA.label === beats && bodyB.label === winner) ||
        //                 (bodyB.label === beats && bodyA.label === winner)
        //             ) {
        //                 const loserBody = bodyA.label === beats ? bodyA : bodyB;
        //                 const loserSprite = bodyToSprite.get(loserBody);
        //                 loserBody.label = winner;
        //                 loserSprite.sprite.texture = Texture.from(texture);
        //                 break;
        //             }
        //         }
        //     }
        // });
    }

    private onRocksUpdate(items: ItemModel[]): void {
        const { rocksPosition: pos, itemSize } = GAME_CONFIG;
        items.forEach(({ uuid, type }) => this.addNewItem(type, pos, uuid));
    }

    private onScissorsUpdate(items: ItemModel[]): void {
        const { scissorsPosition: pos, itemSize } = GAME_CONFIG;
        items.forEach(({ uuid, type }) => this.addNewItem(type, pos, uuid));
    }

    private onPapersUpdate(items: ItemModel[]): void {
        const { papersPosition: pos, itemSize } = GAME_CONFIG;
        items.forEach(({ uuid, type }) => this.addNewItem(type, pos, uuid));
    }

    private addNewItem(type: ItemType, pos: IPointData, uuid: string): void {
        const body = Matter.Bodies.circle(pos.x, pos.y, GAME_CONFIG.itemSize, ItemBodyConfig);
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
