import {createChangeGameAction, createMarkCellAction, createRestartGameAction} from "./actions";

export enum MarkerType {
    cross,
    zero
}

export enum GameMode {
    ticTacToe,
    gomoku1,
    gomoku2
}

export interface ICell {
    markerType: MarkerType | null,
    rowIndex: number,
    columnIndex: number
}

export interface GameConfiguration {
    boardDimension: number,
    winningSequenceLength: number
}

export interface IState {
    board: ICell[][],
    currentTurnMarkerType: MarkerType,
    isWinner: boolean,
    currentGameMode: GameMode,
    gameConfiguration: GameConfiguration
}

export type Action = ReturnType<typeof createMarkCellAction | typeof createRestartGameAction | typeof createChangeGameAction>