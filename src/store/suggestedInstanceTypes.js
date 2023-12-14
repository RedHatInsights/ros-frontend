import { applyReducerHash } from '@redhat-cloud-services/frontend-components-utilities/ReducerRegistry';

const initialState = {
    loading: false,
    serverError: {},
    instances: [],
    count: 0
};

export default applyReducerHash({
    LOAD_SUGGESTED_INSTANCE_TYPES_PENDING: (state) => ({ ...state, loading: true }),
    LOAD_SUGGESTED_INSTANCE_TYPES_FULFILLED: (state, action) => {
        return {
            ...state,
            loading: false,
            instances: action.payload.data,
            count: action.payload.meta.count
        };
    },
    LOAD_SUGGESTED_INSTANCE_TYPES_REJECTED: (state, action) =>
    {
        return {
            ...state,
            loading: false,
            serverError: action.payload
        };
    }
}, initialState);
