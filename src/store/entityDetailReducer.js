import { applyReducerHash } from '@redhat-cloud-services/frontend-components-utilities/ReducerRegistry';
import { Link } from 'react-router-dom';
import React from 'react';
import { ExpandedRow } from '../Components/RosTable/ExpandedRow';
import { ProgressScoreBar } from '../Components/RosTable/ProgressScoreBar';

export const systemName = (displayName, id) => {
    return (
        <Link to={{ pathname: `/${id}` }} className={ `pf-link system-link link-${id}` }>
            { displayName }
        </Link>
    );
};

export const scoreProgress = (data) => {
    return (
        <ProgressScoreBar measureLocation='outside' valueScore={data} />
    );
};

export const recommendations = (data, id) => {
    return (
        <a href='#'
            className={ `pf-link recommendations ${data === 0 ? 'green-400' : ''} link-${id}` }
        >
            {data}
        </a>
    );
};

const addExpandedView = (rowData) => {
    const {
        id, cloud_provider: cloudProvider, instance_type: instanceType,
        idling_time: idlingTime, io_wait: ioWait
    } = rowData;
    return (<ExpandedRow { ...{ id, cloudProvider, instanceType, idlingTime, ioWait } } />);
};

function modifyInventory(columns, state) {

    return {
        ...state,
        columns,
        rows: state.rows.map((row) => ({
            ...row,
            children: addExpandedView(row)
        })),
        loaded: true
    };
}

const openExpandedView = (state, action) => {
    return {
        ...state,
        rows: state.rows.map(row => ({
            ...row,
            isOpen: row.id === action.payload.id ? action.payload.isOpen : row.isOpen
        }))
    };
};

export const entityDetailReducer = ({ LOAD_ENTITIES_FULFILLED }, columns) => applyReducerHash({
    [LOAD_ENTITIES_FULFILLED]: (state) =>  modifyInventory(columns, state),
    ['EXPAND_ROW']: openExpandedView
});
