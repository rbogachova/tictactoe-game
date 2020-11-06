import React from "react";
import {connect} from "react-redux";
import {ICell, IState} from "./redux/types";
import './app.css';
import './cell.css';
import {createMarkWithCrossAction} from "./redux/actions";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & { cell: ICell };

const Cell: React.FC<Props> = (props) => {
    const markWithCross = (): void => {
        props.markWithCross(props.cell.rowIndex, props.cell.columnIndex);
    };

    function renderCell() {
        if (props.cell.isCrossed)
            return "X";
        else if (!props.cell.isCrossed)
            return "O";
        else return null;
    }

    return (
        <span className="initialCell"
              onClick={markWithCross}>
            {renderCell}
        </span>
    );
};

const mapStateToProps = (state: IState) => ({
    board: state.board
});

const mapDispatchToProps = {
    markWithCross: createMarkWithCrossAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
