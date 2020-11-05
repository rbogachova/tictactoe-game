import {typedAction} from "./utilities";

export const markWithCross = 'MARK_WITH_CROSS';

export const createMarkWithCrossAction = (rowIndex: number, columnIndex: number) => {
    return typedAction(markWithCross, {rowIndex, columnIndex});
};
