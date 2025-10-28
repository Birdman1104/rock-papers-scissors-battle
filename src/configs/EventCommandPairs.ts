import { lego } from '@armathai/lego';
import { MainGameEvents, UIViewEvents } from '../events/MainEvents';
import { GameModelEvents, ItemModelEvents } from '../events/ModelEvents';
import { GameState } from '../models/GameModel';
import Head from '../models/HeadModel';
import { ItemType } from '../models/ItemModel';

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
            Head.gameModel.initItems();
            break;
        case GameState.Result:
            break;

        default:
            break;
    }
};

const onCollisionCommand = (uuid: string, turnInto: ItemType) => {
    Head.gameModel?.board?.updateItem(uuid, turnInto);
};

const onItemTypeUpdate = () => {
    Head.gameModel?.board?.onTypeUpdate();
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
    {
        event: MainGameEvents.Collision,
        command: onCollisionCommand,
    },
    {
        event: ItemModelEvents.TypeUpdate,
        command: onItemTypeUpdate,
    },
]);
