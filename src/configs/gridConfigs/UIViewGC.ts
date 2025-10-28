import { lp } from '../../Utils';

export const getUIGridConfig = () => {
    return lp(getUIGridLandscapeConfig, getUIGridPortraitConfig).call(null);
};

const getUIGridLandscapeConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: 'ui',
        debug: { color: 0xd950ff },
        bounds,
        cells: [
            {
                name: 'score',
                bounds: { x: 0, y: 0, width: 0.11, height: 0.11 },
            },
            {
                name: 'start',
                bounds: { x: 0.3, y: 0.7, width: 0.4, height: 0.2 },
            },
        ],
    };
};

const getUIGridPortraitConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: 'ui',
        debug: { color: 0xd950ff },
        bounds,
        cells: [
            {
                name: 'score',
                bounds: { x: 0, y: 0, width: 0.11, height: 0.11 },
            },
            {
                name: 'start',
                bounds: { x: 0, y: 0.75, width: 1, height: 0.15 },
            },
        ],
    };
};
