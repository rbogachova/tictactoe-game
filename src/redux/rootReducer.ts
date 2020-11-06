import {Action, ICell, IState} from "./types";
import {markWithCrossActionType} from "./actions";

function createBoard(): ICell[][] {
    const board: ICell[][] = [];

    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
        board[rowIndex] = [];
        for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
            const cell: ICell = {
                isCrossed: null,
                rowIndex,
                columnIndex
            };

            board[rowIndex][columnIndex] = cell;
        }
    }

    return board;
}

const initialState = {
    board: createBoard(),
    isGameEnded: false
};

const copyBoard = (board: ICell[][]): ICell[][] =>
    board.map(row => row.map(cell => cell));

function countCells(board: ICell[][], cellChecker: (cell: ICell) => boolean): number {
    return board
        .map(row => row.reduce((acc, cell) => cellChecker(cell) ? acc + 1 : acc, 0))
        .reduce((acc, rowCellCount) => acc + rowCellCount);
}

function markWithCross(board: ICell[][], cell: ICell): void {
    const crossCount: number = countCells(board, cell => cell.isCrossed === true);
    const zeroCount: number = countCells(board, cell => cell.isCrossed === false);

    if (cell.isCrossed === null && crossCount === 0 || crossCount === zeroCount)
        cell.isCrossed = true;
    else cell.isCrossed = false;
}

export const rootReducer = (state: IState = initialState, action: Action): IState => {
    switch (action.type) {
        case markWithCrossActionType: {
            const newBoard: ICell[][] = copyBoard(state.board);
            const currentCell: ICell = newBoard[action.payload.rowIndex][action.payload.columnIndex];
            markWithCross(newBoard, currentCell);

            return {...state, board: newBoard};
        }
    }
    return state;
};