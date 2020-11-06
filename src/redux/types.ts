import {createMarkWithCrossAction} from "./actions";

export interface ICell {
    isCrossed: boolean | null,
    rowIndex: number,
    columnIndex: number
}

export interface IState {
    board: ICell[][],
    isGameEnded: boolean
}

export type Action = ReturnType<typeof createMarkWithCrossAction>