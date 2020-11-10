import {Action, ICell, IState, PlayerType} from "./types";
import {markCellActionType} from "./actions";

function createBoard(): ICell[][] {
    const board: ICell[][] = [];

    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
        board[rowIndex] = [];
        for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
            const cell: ICell = {
                marked: null,
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
    turn: PlayerType.cross,
    isGameEnded: false,
    winner: null
};

function countRowSequentCells(row: ICell[], cellIndex: number, cellSequence: number, playerType: PlayerType): number {
    let sequentCellCount = 0;

    for (let cellIndexAdjustment = -cellSequence; cellIndexAdjustment <= cellSequence; cellIndexAdjustment++) {
        if (cellIndexAdjustment === 0)
            continue;
        if (row[cellIndex + cellIndexAdjustment].marked === playerType)
            sequentCellCount++;
    }
    return sequentCellCount;
}

function isWinningSequence(board: ICell[][], rowIndex: number, columnIndex: number, cellSequence: number, player: PlayerType): boolean {
    // Check row sequence.
    return countRowSequentCells(board[rowIndex], columnIndex, cellSequence, player) === cellSequence;
}

function copyBoard(board: ICell[][]): ICell[][] {
    return board.map(row => row.map(cell => cell));
}

function resolveMove(state: IState, currentCell: ICell, playerType: PlayerType): void {
    currentCell.marked = playerType;

    if (isWinningSequence(state.board, currentCell.rowIndex, currentCell.columnIndex, 3, playerType)) {
        state.isGameEnded = true;
        state.winner = playerType;
    } else
        state.turn = playerType === PlayerType.cross ? PlayerType.zero : PlayerType.cross;
}

function markCell(state: IState, rowIndex: number, columnIndex: number): void {
    const currentCell = state.board[rowIndex][columnIndex];

    if (currentCell.marked !== null)
        return;

    if (state.turn === PlayerType.cross)
        resolveMove(state, currentCell, PlayerType.cross);
    else
        resolveMove(state, currentCell, PlayerType.zero);
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