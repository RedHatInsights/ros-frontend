import { applyReducerHash } from '@redhat-cloud-services/frontend-components-utilities/ReducerRegistry';

const initialState = {
    loaded: false,
    serverError: {},
    serverCode: '',
    showConfigSteps: false
};

export default applyReducerHash({
    LOAD_IS_CONFIGURED_INFO_PENDING: (state) => ({ ...state, loaded: true }),
    LOAD_IS_CONFIGURED_INFO_FULFILLED: (state, action) => {
        return {
            ...state,
            loaded: false,
            showConfigSteps: action.payload.success ? false : true,
            serverCode: action.payload.code
        };
    },
    LOAD_IS_CONFIGURED_INFO_REJECTED: (state, action) => ({
        ...state, loaded: false,  serverError: action.payload
    })
}, initialState);
