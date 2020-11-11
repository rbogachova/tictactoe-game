import {ICell, IState} from "./models";
import {createSelector} from "reselect";

const selectBoard = (state: IState): ICell[][] => state.board;

function checkAllCellsMarked(board: ICell[][]): boolean {
    const markedCells = board
        .map(row => row.filter(cell => cell.markerType === null))
        .flat();
    return markedCells.length === 0;
}

export const selectAllCellsMarked = createSelector(
    [selectBoard],
    checkAllCellsMarked);