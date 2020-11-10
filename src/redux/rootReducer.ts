import {Action, ICell, IState, MarkerType} from "./types";
import {markCellActionType, restartGameActionType} from "./actions";

const boardDimension = 3;
const winningSequenceLength = 3;

function createBoard(): ICell[][] {
    const board: ICell[][] = [];

    for (let rowIndex = 0; rowIndex < boardDimension; rowIndex++) {
        board[rowIndex] = [];
        for (let columnIndex = 0; columnIndex < boardDimension; columnIndex++) {
            const cell: ICell = {
                markerType: null,
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
    currentTurnMarkerType: MarkerType.cross,
    isWinner: false
};

function countRowSideSequentCells(row: ICell[], currentIndex: number, step: number): number {
    const markerType = row[currentIndex].markerType;
    let count = 0;

    for (let i = currentIndex + step; i >= 0 && i < row.length; i += step) {
        if (row[i].markerType !== markerType)
            return count;
        count++;
    }
    return count;
}

function countRowSequentCells(row: ICell[], currentIndex: number): number {
    return 1 + countRowSideSequentCells(row, currentIndex, -1) + countRowSideSequentCells(row, currentIndex, 1);
}

function isWinningSequence(board: ICell[][], rowIndex: number, columnIndex: number): boolean {
    // Check row sequence.
    return countRowSequentCells(board[rowIndex], columnIndex) >= winningSequenceLength;
}

function markCell(state: IState, rowIndex: number, columnIndex: number): void {
    if (state.isWinner)
        return;

    const currentCell = state.board[rowIndex][columnIndex];

    if (currentCell.markerType != null)
        return;

    currentCell.markerType = state.currentTurnMarkerType;

    if (isWinningSequence(state.board, currentCell.rowIndex, currentCell.columnIndex)) {
        state.isWinner = true;
    } else {
        state.currentTurnMarkerType = state.currentTurnMarkerType === MarkerType.cross
            ? MarkerType.zero
            : MarkerType.cross;
    }
}

function createState(): IState {
    return {
        board: createBoard(),
        currentTurnMarkerType: MarkerType.cross,
        isWinner: false
    }
}

function copyBoard(board: ICell[][]): ICell[][] {
    return board.map(row => row.map(cell => cell));
}

export const rootReducer = (state: IState = initialState, action: Action): IState => {
    switch (action.type) {
        case markCellActionType: {
            const newBoard = copyBoard(state.board);
            const newState = {...state, board: newBoard};
            markCell(newState, action.payload.rowIndex, action.payload.columnIndex);

            return newState;
        }

        case restartGameActionType: {
            const newState = createState();

            return newState;
        }
    }
    return state;
};