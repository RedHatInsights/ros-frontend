import { applyReducerHash } from '@redhat-cloud-services/frontend-components-utilities/ReducerRegistry';

const initialState = {
    loading: false,
    serverError: {},
    instances: [],
    count: 0
};

export default applyReducerHash({
    LOAD_ROS_SYSTEMS_PENDING: (state) => ({ ...state, loading: true }),
    LOAD_ROS_SYSTEMS_FULFILLED: (state, action) => {
        return {
            ...state,
            loading: false,
            instances: action.payload.data,
            count: action.payload.meta.count
        };
    },
    LOAD_ROS_SYSTEMS_REJECTED: (state, action) =>
    {
        return {
            ...state,
            serverError: action.payload
        };
    }
}, initialState);
