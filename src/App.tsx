import React from "react";
import {connect} from "react-redux";
import {ICell, IState} from "./redux/types";
import {v4 as uuidv4} from 'uuid';
import Cell from "./Cell";
import './app.css';

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const renderCell = (cell: ICell): JSX.Element =>
    <Cell key={uuidv4()} cell={cell}/>;

const renderRow = (row: ICell[]) =>
    <div key={uuidv4()}>{row.map(renderCell)}</div>;

const App: React.FC<Props> = (props) => {
    return (
        <div className="App">
            <h1>TIC TAC TOE</h1>
            {props.board.map(renderRow)}
        </div>
    );
};

const mapStateToProps = (state: IState) => ({
    board: state.board
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
