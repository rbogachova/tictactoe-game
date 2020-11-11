import React from "react";
import {connect} from "react-redux";
import {ICell, IState, MarkerType} from "./redux/models";
import './app.css';
import './cell.css';
import {createMarkCellAction} from "./redux/actions";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & { cell: ICell };

const Cell: React.FC<Props> = (props) => {
    const markCell = (): void => {
        props.markCell(props.cell.rowIndex, props.cell.columnIndex);
    };

    function renderCell() {
        if (props.cell.markerType === null)
            return null;
        return props.cell.markerType === MarkerType.cross ? 'X' : '0';
    }

    return (
        <span className="initialCell"
              onClick={markCell}>
            {renderCell()}
        </span>
    );
};

const mapStateToProps = (state: IState) => ({
    board: state.board
});

const mapDispatchToProps = {
    markCell: createMarkCellAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
