import { applyReducerHash } from '@redhat-cloud-services/frontend-components-utilities/ReducerRegistry';

const initialState = {
    loading: false,
    serverError: '',
    serverCode: '',
    showConfigSteps: false,
    systemCount: 0,
    systemWithSuggestions: 0
};

export default applyReducerHash({
    LOAD_IS_CONFIGURED_INFO_PENDING: (state) => ({ ...state, loading: true }),
    LOAD_IS_CONFIGURED_INFO_FULFILLED: (state, action) => {
        return {
            ...state,
            loading: false,
            showConfigSteps: action.payload.success ? false : true,
            serverCode: action.payload.code,
            systemCount: action.payload.count,
            systemWithSuggestions: action.payload.systems_stats.with_suggestions
        };
    },
    LOAD_IS_CONFIGURED_INFO_REJECTED: (state, action) => ({
        ...state, loading: false,  serverError: action.payload
    })
}, initialState);
