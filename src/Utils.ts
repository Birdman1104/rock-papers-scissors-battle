import { Container, Graphics, Text } from 'pixi.js';

export const lp = (l, p) => {
    const { clientWidth: w, clientHeight: h } = document.body;
    return w > h ? l : p;
};

export const fitDimension = (
    dim: { width: number; height: number },
    minRatio: number,
    maxRatio: number,
): { width: number; height: number } => {
    const ratioW = dim.width / dim.height;
    const ratioH = dim.height / dim.width;

    if (ratioW < ratioH) {
        if (ratioW > maxRatio) {
            dim.width = dim.width * (maxRatio / ratioW);
        } else if (ratioW < minRatio) {
            dim.height = dim.height * (ratioW / minRatio);
        }
    } else {
        if (ratioH > maxRatio) {
            dim.height = dim.height * (maxRatio / ratioH);
        } else if (ratioH < minRatio) {
            dim.width = dim.width * (ratioH / minRatio);
        }
    }

    return dim;
};

export const delayRunnable = (delay, runnable, context?, ...args) => {
    let delayMS = delay * 1000;
    const delayWrapper = () => {
        delayMS -= window.game.ticker.deltaMS;
        if (delayMS <= 0) {
            runnable.call(context, ...args);
            window.game.ticker.remove(delayWrapper);
        }
    };
    window.game.ticker.add(delayWrapper);
    return delayWrapper;
};

export const loopRunnable = (delay, runnable, context = null, ...args) => {
    return window.game.time.events.loop(delay, runnable, context, ...args);
};

export const removeRunnable = (runnable) => window.game.ticker.remove(runnable);

export const drawBounds = (gameObject: Container, color = 0xffffff * Math.random(), alpha = 0.5): Graphics => {
    const { x, y, width, height } = gameObject.getBounds();
    const gr = new Graphics();
    gr.beginFill(color, alpha);
    gr.drawRect(x, y, width, height);
    gr.endFill();
    gameObject.addChild(gr);
    return gr;
};

export const drawPoint = (
    container: any,
    x: number,
    y: number,
    radius = 5,
    color = 0xffffff * Math.random(),
    alpha = 0.5,
): Graphics => {
    const gr = new Graphics();
    gr.beginFill(color, alpha);
    gr.drawCircle(x, y, radius);
    gr.endFill();
    container.addChild(gr);
    return gr;
};

export const makeText = (config: TextConfig, name?: string): Text => {
    const { text: content, x = 0, y = 0, alpha = 1, style = {}, anchor = { x: 0.5, y: 0.5 } } = config;
    const text = new Text(content, style);
    text.position.set(x, y);
    text.anchor.set(anchor.x, anchor.y);
    text.alpha = alpha;
    name && (text.name = name);
    return text;
};
