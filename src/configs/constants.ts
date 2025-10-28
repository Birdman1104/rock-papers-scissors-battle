export const GAME_CONFIG = {
    width: 1500,
    height: 1500,
    itemsCount: 25,
    itemSize: 25,
    positions: {
        rock: { x: 100, y: 100 },
        paper: { x: 1400, y: 100 },
        scissors: { x: 750, y: 1400 },
    },
};

export const getBodyConfig = (name: string) => {
    return {
        restitution: 1.04,
        friction: 0,
        frictionAir: 0,
        label: name,
    };
};

export const wallBodyConfig = {
    isStatic: true,
    restitution: 1.04,
    friction: 0,
};

export const winningCombos = {
    paper: { beats: 'rock', texture: 'paper.png' },
    rock: { beats: 'scissors', texture: 'rock.png' },
    scissors: { beats: 'paper', texture: 'scissors.png' },
};
