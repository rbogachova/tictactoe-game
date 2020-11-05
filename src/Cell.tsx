import React from "react";
import {connect} from "react-redux";
import {ICell, IState} from "./redux/types";
import './app.css';
import './cell.css';

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & { cell: ICell };

const Cell: React.FC<Props> = (props) => {
    const markWithCross = () => {

    };

    return (
        <span className="initialCell"
              onClick={markWithCross}>
            {
                props.cell.isCrossed && "X"
            }
        </span>
    );
};

const mapStateToProps = (state: IState) => ({
    board: state.board
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
