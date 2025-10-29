import { CellAlign } from '@armathai/pixi-grid';
import { lp } from '../../Utils';

export const getUIGridConfig = () => {
    return lp(getUIGridLandscapeConfig, getUIGridPortraitConfig).call(null);
};

const getUIGridLandscapeConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: 'ui',
        // debug: { color: 0xd950ff },
        bounds,
        cells: [
            {
                name: 'score',
                bounds: { x: 0.01, y: 0.01, width: 0.3, height: 0.3 },
                align: CellAlign.leftTop,
            },
            {
                name: 'popup',
                bounds: { x: 0.1, y: 0.1, width: 0.8, height: 0.65 },
            },
            {
                name: 'start',
                bounds: { x: 0.3, y: 0.8, width: 0.4, height: 0.15 },
            },
        ],
    };
};

const getUIGridPortraitConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: 'ui',
        // debug: { color: 0xd950ff },
        bounds,
        cells: [
            {
                name: 'score',
                bounds: { x: 0.01, y: 0.01, width: 0.3, height: 0.2 },
                align: CellAlign.leftTop,
            },
            {
                name: 'popup',
                bounds: { x: 0.1, y: 0.1, width: 0.8, height: 0.65 },
            },
            {
                name: 'start',
                bounds: { x: 0, y: 0.8, width: 1, height: 0.15 },
            },
        ],
    };
};
