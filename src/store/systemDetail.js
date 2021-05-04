import { applyReducerHash } from '@redhat-cloud-services/frontend-components-utilities/ReducerRegistry';

const initialState = {};

export default applyReducerHash({
    LOAD_ROS_SYSTEM_INFO_PENDING: (state) => ({ ...state, systemInfo: {}, loading: true }),
    LOAD_ROS_SYSTEM_INFO_FULFILLED: (state, { payload }) => {
        return {
            ...state,
            loading: false,
            systemInfo: payload
        };
    }
}, initialState);
