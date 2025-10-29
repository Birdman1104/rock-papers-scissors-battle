import { lego } from '@armathai/lego';
import { MainGameEvents, UIViewEvents } from '../events/MainEvents';
import { BoardModelEvents, GameModelEvents, ItemModelEvents } from '../events/ModelEvents';
import { GameState } from '../models/GameModel';
import Head from '../models/HeadModel';
import { ItemType } from '../models/ItemModel';
import { GAME_CONFIG } from './constants';

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

const restartButtonClickCommand = () => {
    Head.gameModel.restart();
};

const gameStateUpdateCommand = (state: GameState) => {
    switch (state) {
        case GameState.Intro:
            Head.gameModel?.setWinner(undefined);
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

const onRockCountersUpdate = (value: number) => {
    if (value === GAME_CONFIG.itemsCount * 3) {
        Head.gameModel.setState(GameState.Result);
        Head.gameModel.setWinner('rock');
    }
};

const onPaperCountersUpdate = (value: number) => {
    if (value === GAME_CONFIG.itemsCount * 3) {
        Head.gameModel.setState(GameState.Result);
        Head.gameModel.setWinner('paper');
    }
};

const onScissorsCountersUpdate = (value: number) => {
    if (value === GAME_CONFIG.itemsCount * 3) {
        Head.gameModel.setState(GameState.Result);
        Head.gameModel.setWinner('scissors');
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
        event: UIViewEvents.RestartButtonClick,
        command: restartButtonClickCommand,
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
    {
        event: BoardModelEvents.RocksCounterUpdate,
        command: onRockCountersUpdate,
    },
    {
        event: BoardModelEvents.PapersCounterUpdate,
        command: onPaperCountersUpdate,
    },
    {
        event: BoardModelEvents.ScissorsCounterUpdate,
        command: onScissorsCountersUpdate,
    },
]);
