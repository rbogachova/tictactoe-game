import {ICell, IState} from "./types";

const createBoard = (): ICell[][] => {
    const board: ICell[][] = [];

    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
        board[rowIndex] = [];
        for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
            const cell: ICell = {
                isCrossed: false,
                isOpen: false,
                rowIndex,
                columnIndex
            };

            board[rowIndex][columnIndex] = cell;
        }
    }

    return board;
};

const initialState = {
    board: createBoard(),
    isGameEnded: false
};

export const rootReducer = (state: IState = initialState) => {
    return state;
};