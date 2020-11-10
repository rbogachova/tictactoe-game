import {createMarkCellAction} from "./actions";

export enum PlayerType {
    cross,
    zero
}

export interface ICell {
    marked: PlayerType | null,
    rowIndex: number,
    columnIndex: number
}

export interface IState {
    board: ICell[][],
    turn: PlayerType,
    isGameEnded: boolean,
    winner: PlayerType | null
}

export type Action = ReturnType<typeof createMarkCellAction>