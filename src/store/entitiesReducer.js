import { applyReducerHash } from '@redhat-cloud-services/frontend-components-utilities/ReducerRegistry';
import { Link } from 'react-router-dom';
import React from 'react';
import { Tooltip } from '@patternfly/react-core';
import { ExpandedRow } from '../Components/RosTable/ExpandedRow';
import { ProgressScoreBar } from '../Components/RosTable/ProgressScoreBar';
import { SystemState } from '../Components/RosTable/SystemState';
import { NO_DATA_VALUE, NO_DATA_STATE } from '../constants';

export const systemName = (displayName, id, { inventory_id: inventoryId, isDeleted, state }) => {
    return (
        isDeleted ? (
            <Tooltip content={<div>{displayName} has been deleted from inventory</div>}>
                <span tabIndex="0">{ displayName }</span>
            </Tooltip>
        ) :
            state === NO_DATA_STATE ?
                (
                    <span>{ displayName }</span>
                ) :
                (
                    <Link to={{ pathname: `/${inventoryId}` }} className={ `pf-link system-link link-${inventoryId}` }>
                        { displayName }
                    </Link>
                )

    );
};

export const displayState = (data) => {
    return (<SystemState stateValue={ data }/>);
};

export const scoreProgress = () => (data, id, { state }) => {
    return (
        state === NO_DATA_STATE ?
            <span>{ NO_DATA_VALUE }</span> :
            <ProgressScoreBar measureLocation='outside'
                utilizedValue={data} />
    );
};

export const recommendations = (data, id, { inventory_id: inventoryId, isDeleted, state }) => {
    return (
        isDeleted ? <span>{ state === NO_DATA_STATE ? NO_DATA_VALUE : data }</span>
            : state === NO_DATA_STATE ?
                (
                    <span>{ NO_DATA_VALUE }</span>
                )
                : (
                    <Link to={{ pathname: `/${inventoryId}` }}
                        className={ `pf-link link-${inventoryId}` }>
                        { data }
                    </Link>
                )
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

export const entitiesReducer = ({ LOAD_ENTITIES_FULFILLED }, columns) => applyReducerHash({
    [LOAD_ENTITIES_FULFILLED]: (state) =>  modifyInventory(columns, state),
    ['EXPAND_ROW']: openExpandedView
});
