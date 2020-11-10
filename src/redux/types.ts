import {createMarkCellAction, createRestartGameAction} from "./actions";

export enum MarkerType {
    cross,
    zero
}

export interface ICell {
    markerType: MarkerType | null,
    rowIndex: number,
    columnIndex: number
}

export interface IState {
    board: ICell[][],
    currentTurnMarkerType: MarkerType,
    isWinner: boolean
}

export type Action = ReturnType<typeof createMarkCellAction | typeof createRestartGameAction>