import {createAction} from "./utilities";
import {GameMode} from "./models";

export const markCellActionType = 'MARK_CELL';
export const restartGameActionType = 'RESTART_GAME';
export const changeGameActionType = 'CHANGE_GAME';

export const createMarkCellAction = (rowIndex: number, columnIndex: number) => {
    return createAction(markCellActionType, {rowIndex, columnIndex});
};

export const createRestartGameAction = () => {
    return createAction(restartGameActionType);
};

export const createChangeGameAction = (gameMode: GameMode) => {
    return createAction(changeGameActionType, {gameMode: gameMode});
};
