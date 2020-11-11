import React from "react";
import {connect} from "react-redux";
import {ICell, IState, MarkerType} from "./redux/types";
import {v4 as uuidv4} from 'uuid';
import Cell from "./Cell";
import './app.css';
import {Alert} from "antd";
import 'antd/dist/antd.css';
import {createChangeGameAction, createRestartGameAction} from "./redux/actions";

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
        props.changeGame(+e.currentTarget.value);
    }

    const defineWinner = () => {

    };

    const showCrossCongratulationsMessage = (): JSX.Element =>
        <Alert message="{winner} WON!"
               type="success"
               closable
               onClick={restart}/>
    ;

    function renderCurrentGameName() {
        return props.currentGame === 0 ? "TIC TAC TOE" : "GOMOKU";
    }

    function showTurn() {
        if (props.currentTurnMarkerType === MarkerType.cross)
            return "X";
        return "0";
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
                        <select name="gameNames" id="gameNames" onChange={changeGame}>
                            <option value="0">TIC TAC TOE</option>
                            <option value="1">GOMOKU 10 x 10</option>
                            <option value="2">GOMOKU 20 x 20</option>
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
            {props.isWinner && showCrossCongratulationsMessage()}
        </div>
    );
};

const mapStateToProps = (state: IState) => ({
    board: state.board,
    isWinner: state.isWinner,
    currentTurnMarkerType: state.currentTurnMarkerType,
    currentGame: state.currentGameMode
});

const mapDispatchToProps = {
    restartGame: createRestartGameAction,
    changeGame: createChangeGameAction
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
