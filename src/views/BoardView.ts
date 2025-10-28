import Matter from 'matter-js';
import { Container, Rectangle, Texture } from 'pixi.js';
import { Item } from './Item';

const WIDTH = 500;
const HEIGHT = 500;

export class BoardView extends Container {
    constructor() {
        super();
        this.build();
    }

    public getBounds(): Rectangle {
        return new Rectangle(0, 0, WIDTH, HEIGHT);
    }

    private build(): void {
        const thickness = 50;
        const wallOptions = {
            isStatic: true,
            restitution: 1,
            friction: 0,
        };
        const walls = [
            Matter.Bodies.rectangle(WIDTH / 2, -thickness / 2, WIDTH, thickness, wallOptions),
            Matter.Bodies.rectangle(WIDTH / 2, HEIGHT + thickness / 2, WIDTH, thickness, wallOptions),
            Matter.Bodies.rectangle(-thickness / 2, HEIGHT / 2, thickness, HEIGHT, wallOptions),
            Matter.Bodies.rectangle(WIDTH + thickness / 2, HEIGHT / 2, thickness, HEIGHT, wallOptions),
        ];
        Matter.World.add(window.gamePhysicsWorld, walls);

        const bodyToSprite = new Map();

        for (let i = 0; i < 30; i++) {
            const name = i % 3 === 0 ? 'rock' : i % 3 === 1 ? 'paper' : 'scissors';
            const size = 25;
            const x = Math.random() * (WIDTH - 100) + 50;
            const y = Math.random() * (HEIGHT - 100) + 50;

            const body = Matter.Bodies.circle(x, y, size, {
                restitution: 1,
                friction: 0,
                frictionAir: 0,
                label: name,
            });

            Matter.Body.setVelocity(body, {
                x: (Math.random() - 0.5) * 10,
                y: (Math.random() - 0.5) * 10,
            });

            const item = new Item(name);
            this.addChild(item);

            bodyToSprite.set(body, item);
            Matter.World.add(window.gamePhysicsWorld, body);
        }

        window.game.ticker.add(() => {
            for (const [body, sprite] of bodyToSprite) {
                sprite.x = body.position.x;
                sprite.y = body.position.y;
                sprite.rotation = body.angle;
            }
        });

        const winningCombos = {
            paper: { beats: 'rock', texture: 'paper.png' },
            rock: { beats: 'scissors', texture: 'rock.png' },
            scissors: { beats: 'paper', texture: 'scissors.png' },
        };

        Matter.Events.on(window.gamePhysicsEngine, 'collisionStart', (event) => {
            for (const pair of event.pairs) {
                const { bodyA, bodyB } = pair;

                for (const [winner, { beats, texture }] of Object.entries(winningCombos)) {
                    if (
                        (bodyA.label === beats && bodyB.label === winner) ||
                        (bodyB.label === beats && bodyA.label === winner)
                    ) {
                        const loserBody = bodyA.label === beats ? bodyA : bodyB;
                        const loserSprite = bodyToSprite.get(loserBody);
                        loserBody.label = winner;
                        loserSprite.sprite.texture = Texture.from(texture);
                        break;
                    }
                }
            }
        });
    }
}
