export interface ICell {
    isCrossed: boolean,
    isOpen: boolean,
    rowIndex: number,
    columnIndex: number
}

export interface IState {
    board: ICell[][],
    isGameEnded: boolean
}