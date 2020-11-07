import {Action, ICell, IState} from "./types";
import {markCellActionType} from "./actions";

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

const initialState: IState = {
    board: createBoard(),
    isGameEnded: false,
    isCrossTurn: true
};

const copyBoard = (board: ICell[][]): ICell[][] =>
    board.map(row => row.map(cell => cell));

function markCell(state: IState, rowIndex: number, columnIndex: number): void {
    const currentCell = state.board[rowIndex][columnIndex];

    if (currentCell.isCrossed !== null)
        return;

    if (state.isCrossTurn) {
        currentCell.isCrossed = true;
        state.isCrossTurn = false;
    } else {
        currentCell.isCrossed = false;
        state.isCrossTurn = true;
    }
}

export const rootReducer = (state: IState = initialState, action: Action): IState => {
    switch (action.type) {
        case markCellActionType: {
            const newBoard = copyBoard(state.board);
            const newState = {...state, board: newBoard};
            markCell(newState, action.payload.rowIndex, action.payload.columnIndex);

            return newState;
        }
    }
    return state;
};