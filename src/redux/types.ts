import {createChangeGameAction, createMarkCellAction, createRestartGameAction} from "./actions";

export enum MarkerType {
    cross,
    zero
}

export enum Game {
    ticTacToe,
    gomoku1,
    gomoku2
}

export interface ICell {
    markerType: MarkerType | null,
    rowIndex: number,
    columnIndex: number
}

export interface IState {
    board: ICell[][],
    currentTurnMarkerType: MarkerType,
    isWinner: boolean,
    currentGame: Game
}

export type Action = ReturnType<typeof createMarkCellAction | typeof createRestartGameAction | typeof createChangeGameAction>