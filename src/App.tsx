import React from "react";
import {connect} from "react-redux";
import {GameMode, ICell, IState, MarkerType} from "./redux/types";
import {v4 as uuidv4} from 'uuid';
import Cell from "./Cell";
import './app.css';
import {Alert} from "antd";
import 'antd/dist/antd.css';
import {createChangeGameAction, createRestartGameAction} from "./redux/actions";
import {selectAllCellsMarked} from "./redux/selectors";
import {number} from "prop-types";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const renderCell = (cell: ICell): JSX.Element =>
    <Cell key={uuidv4()} cell={cell}/>;

const renderRow = (row: ICell[]) =>
    <div key={uuidv4()}>{row.map(renderCell)}</div>;

const App: React.FC<Props> = (props) => {
    function restart() {
        props.restartGame();
    }

    function changeGame(e: React.FormEvent<HTMLSelectElement>) {
        props.changeGame(parseGameMode(e.currentTarget.value));
    }

    const defineWinner = () => {
        if (props.isWinner && props.currentTurnMarkerType === MarkerType.zero)
            return "0";
        else return "X";
    };

    const showCongratulationsMessage = (): JSX.Element =>
        <Alert message={`${defineWinner()} WON!`}
               type="success"
               closable
               onClick={restart}/>;

    function renderDrawMessage() {
        if (props.checkAllCellsMarked && !props.isWinner)
            return (
                <Alert message="DRAW"
                       type="success"
                       closable
                       onClick={restart}/>
            )
    }

    function renderCurrentGameName() {
        return props.currentGame === 0 ? "TIC TAC TOE" : "GOMOKU";
    }

    function showTurn() {
        if (props.currentTurnMarkerType === MarkerType.cross)
            return "X";
        return "0";
    }

    function convertGameModeToText(gameMode: GameMode): string {
        return gameMode.toString();
    }

    function parseGameMode(value: string): GameMode {
        return parseInt(value);
    }

    return (
        <div className="app">
            <table className="center">
                <tbody>
                <tr>
                    <td>
                        <h1>{renderCurrentGameName()}</h1>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>Game Type </span>
                        <select onChange={changeGame}>
                            <option value={convertGameModeToText(GameMode.ticTacToe)}>TIC TAC TOE</option>
                            <option value={convertGameModeToText(GameMode.gomoku1)}>GOMOKU 10 x 10</option>
                            <option value={convertGameModeToText(GameMode.gomoku2)}>GOMOKU 20 x 20</option>
                        </select>
                        <button onClick={restart}>Restart</button>
                    </td>
                </tr>
                <tr>
                    <td>Current Turn: {showTurn()}</td>
                </tr>
                </tbody>
            </table>
            {props.board.map(renderRow)}
            {props.isWinner && showCongratulationsMessage()}
            {renderDrawMessage()}
        </div>
    );
};

const mapStateToProps = (state: IState) => ({
    board: state.board,
    isWinner: state.isWinner,
    currentTurnMarkerType: state.currentTurnMarkerType,
    currentGame: state.currentGameMode,
    checkAllCellsMarked: selectAllCellsMarked(state)
});

const mapDispatchToProps = {
    restartGame: createRestartGameAction,
    changeGame: createChangeGameAction
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
