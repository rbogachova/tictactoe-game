import {createAction} from "./utilities";

export const markCellActionType = 'MARK_CELL';
export const restartGameActionType = 'RESTART_GAME';

export const createMarkCellAction = (rowIndex: number, columnIndex: number) => {
    return createAction(markCellActionType, {rowIndex, columnIndex});
};

export const createRestartGameAction = () => {
    return createAction(restartGameActionType);
};
