import { applyReducerHash } from '@redhat-cloud-services/frontend-components-utilities/files/cjs/ReducerRegistry';

const initialState = {
    loading: false,
    systemsData: [],
    systemError: {},
    totalSystems: 0,
    emptyState: false
};

const systemsTableReducer = applyReducerHash({
    FETCH_CLOUD_SYSTEMS_LIST_PENDING: (state) => ({ ...state, loading: true }),
    FETCH_CLOUD_SYSTEMS_LIST_FULFILLED: (state, action) => {
        return {
            ...state,
            loading: false,
            emptyState: action.payload.meta.count === 0,
            systemsData: action.payload.data,
            totalSystems: action.payload.meta.count
        };
    },
    // Need to handle errors
    FETCH_CLOUD_SYSTEMS_LIST_REJECTED: (state, action) => ({
        ...state, loading: false,  emptyState: true, systemError: action.payload
    })
}, initialState);

export default systemsTableReducer;
