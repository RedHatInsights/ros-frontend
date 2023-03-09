import { applyReducerHash } from '@redhat-cloud-services/frontend-components-utilities/ReducerRegistry';

const defaultState = { loaded: false };

const entityLoaded = (state) => {
    return {
        ...state,
        loaded: true
    };
};

export const entityDetailReducer = ({ LOAD_ENTITY_FULFILLED }) => applyReducerHash(
    {
        [LOAD_ENTITY_FULFILLED]: entityLoaded
    },
    defaultState
);
