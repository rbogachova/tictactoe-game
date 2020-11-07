import {createAction} from "./utilities";

export const markCellActionType = 'MARK_CELL';

export const createMarkCellAction = (rowIndex: number, columnIndex: number) => {
    return createAction(markCellActionType, {rowIndex, columnIndex});
};
