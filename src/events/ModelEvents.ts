export const BoardModelEvents = {
    ItemsUpdate: 'BoardModelItemsUpdate',
    RocksCounterUpdate: 'BoardModelRocksCounterUpdate',
    PapersCounterUpdate: 'BoardModelPapersCounterUpdate',
    ScissorsCounterUpdate: 'BoardModelScissorsCounterUpdate',
};

export const GameModelEvents = {
    StateUpdate: 'GameModelStateUpdate',
    BoardUpdate: 'GameModelBoardUpdate',
    WinnerUpdate: 'GameModelWinnerUpdate',
};

export const HeadModelEvents = { GameModelUpdate: 'HeadModelGameModelUpdate' };

export const ItemModelEvents = { TypeUpdate: 'ItemModelTypeUpdate' };
