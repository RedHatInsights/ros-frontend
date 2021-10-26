import { applyReducerHash } from '@redhat-cloud-services/frontend-components-utilities/ReducerRegistry';
import { Link } from 'react-router-dom';
import React from 'react';
import { Tooltip } from '@patternfly/react-core';
import { ExpandedRow } from '../Components/RosTable/ExpandedRow';
import { ProgressScoreBar } from '../Components/RosTable/ProgressScoreBar';
import { SystemState } from '../Components/RosTable/SystemState';

export const systemName = (displayName, id, { inventory_id: inventoryId, isDeleted, state }) => {
    return (
        isDeleted ? (
            <Tooltip content={<div>{displayName} has been deleted from inventory</div>}>
                <span tabIndex="0">{ displayName }</span>
            </Tooltip>
        ) :
            state === 'Waiting for data' ?
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

export const scoreProgress = () => (data) => {
    return (
        <ProgressScoreBar measureLocation='outside'
            utilizedValue={data} />
    );
};

export const recommendations = (data, id, { inventory_id: inventoryId, isDeleted, state }) => {
    return (
        (isDeleted || state === 'Waiting for data')
            ? <span className='recommendations'>{ data }</span>
            : (
                <Link to={{ pathname: `/${inventoryId}` }}
                    className={ `pf-link recommendations link-${inventoryId}` }>
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
