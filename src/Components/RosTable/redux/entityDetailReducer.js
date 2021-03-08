import { applyReducerHash } from '@redhat-cloud-services/frontend-components-utilities/ReducerRegistry';

export const entityDetailReducer = ({ LOAD_ENTITIES_FULFILLED }, columns) => applyReducerHash({
    [LOAD_ENTITIES_FULFILLED]: (state) => ({
        ...state,
        columns,
        loaded: true
    })
});
