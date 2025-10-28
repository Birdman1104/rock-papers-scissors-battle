import Matter from 'matter-js';
import App from './App';

// @ts-ignore
window.addEventListener('load', () => {
    window.game = new App();
    window.game.init();

    globalThis.__PIXI_APP__ = window.game;

    window.gamePhysicsEngine = Matter.Engine.create();
    window.gamePhysicsWorld = window.gamePhysicsEngine.world;
    window.gamePhysicsEngine.gravity.y = 0;

    window.addEventListener('resize', () => window.game.appResize());
    window.addEventListener('orientationchange', () => window.game.appResize());
    window.addEventListener('focus', () => window.game.onFocusChange(true));
    window.addEventListener('blur', () => window.game.onFocusChange(false));
});
