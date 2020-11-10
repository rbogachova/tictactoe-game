import {createAction} from "./utilities";
import {Game} from "./types";

export const markCellActionType = 'MARK_CELL';
export const restartGameActionType = 'RESTART_GAME';
export const changeGameActionType = 'CHANGE_GAME';

export const createMarkCellAction = (rowIndex: number, columnIndex: number) => {
    return createAction(markCellActionType, {rowIndex, columnIndex});
};

export const createRestartGameAction = () => {
    return createAction(restartGameActionType);
};

export const createChangeGameAction = (gameName: Game) => {
    return createAction(changeGameActionType, {gameName});
};
