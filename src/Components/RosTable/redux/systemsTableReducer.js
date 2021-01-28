import { applyReducerHash } from '@redhat-cloud-services/frontend-components-utilities/files/cjs/ReducerRegistry';

const initialState = {
    loading: false,
    systemsData: [],
    systemError: {}
};

const systemsTableReducer = applyReducerHash({
    FETCH_CLOUD_SYSTEMS_LIST_PENDING: (state) => ({ ...state, loading: true }),
    FETCH_CLOUD_SYSTEMS_LIST_FULFILLED: (state, action) => {
        console.log(action);
        return { ...state, loading: false, systemsData: action.payload };
    },
    FETCH_CLOUD_SYSTEMS_LIST_REJECTED: (state, action) => ({
        ...state, loading: false, systemError: action.payload
    })
}, initialState);

export default systemsTableReducer;
