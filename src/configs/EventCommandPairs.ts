import { lego } from '@armathai/lego';
import { MainGameEvents, UIViewEvents } from '../events/MainEvents';
import { GameModelEvents } from '../events/ModelEvents';
import { GameState } from '../models/GameModel';
import Head from '../models/HeadModel';

export const mapCommands = () => {
    eventCommandPairs.forEach(({ event, command }) => {
        lego.event.on(event, command);
    });
};

export const unMapCommands = () => {
    eventCommandPairs.forEach(({ event, command }) => {
        lego.event.off(event, command);
    });
};

const onMainViewReadyCommand = () => {
    Head.init();
    Head.initGameModel();
};

const startButtonClickCommand = () => {
    Head.gameModel.setState(GameState.Game);
};

const gameStateUpdateCommand = (state: GameState) => {
    switch (state) {
        case GameState.Intro:
            break;
        case GameState.Game:
            Head.gameModel.initElements();
            break;
        case GameState.Result:
            break;

        default:
            break;
    }
};

const eventCommandPairs = Object.freeze([
    {
        event: MainGameEvents.MainViewReady,
        command: onMainViewReadyCommand,
    },
    {
        event: UIViewEvents.StartButtonClick,
        command: startButtonClickCommand,
    },
    {
        event: GameModelEvents.StateUpdate,
        command: gameStateUpdateCommand,
    },
]);
