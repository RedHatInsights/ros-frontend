import { applyReducerHash } from '@redhat-cloud-services/frontend-components-utilities/ReducerRegistry';
import { SYSTEM_TABLE_COLUMNS } from '../constants';

const initialState = {
    columns: SYSTEM_TABLE_COLUMNS
};

export default applyReducerHash({
    CHANGE_SYSTEM_COLUMNS: (state, action) => ({
        ...state,
        columns: action.payload.columns
    }
    )
}, initialState);
