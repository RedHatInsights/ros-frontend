import { applyReducerHash } from '@redhat-cloud-services/frontend-components-utilities/ReducerRegistry';
import React from 'react';
import { ExpandedRow } from '../ExpandedRow';

const addExpandedView = (rowData) => {
    const {
        id, cloud_provider: cloudProvider, instance_type: instanceType,
        idling_time: idlingTime, io_wait: ioWait
    } = rowData;
    return (<ExpandedRow { ...{ id, cloudProvider, instanceType, idlingTime, ioWait } } />);
};

function modifyInventory(columns, pageState, state) {
    console.log('modifyInventory');
    console.log(state);
    console.log(pageState);

    /*const { page, perPage, orderBy, orderDirection }  = pageState;
    const sortBy = { key: orderBy, direction: orderDirection };*/

    return {
        ...state,
        columns,
        rows: state.rows.map((row) => ({
            ...row,
            children: addExpandedView(row)
        })),
        /*page,
        perPage,
        sortBy,*/
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

export const entityDetailReducer = ({ LOAD_ENTITIES_FULFILLED }, columns, pageState) => applyReducerHash({
    [LOAD_ENTITIES_FULFILLED]: (state) =>  modifyInventory(columns, pageState, state),
    ['EXPAND_ROW']: openExpandedView
});
