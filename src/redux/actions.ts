import {createAction} from "./utilities";

export const markWithCrossActionType = 'MARK_WITH_CROSS';

export const createMarkWithCrossAction = (rowIndex: number, columnIndex: number) => {
    return createAction(markWithCrossActionType, {rowIndex, columnIndex});
};
