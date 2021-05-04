import { applyReducerHash } from '@redhat-cloud-services/frontend-components-utilities/ReducerRegistry';
import SystemDetail from '../Components/SystemDetail/SystemDetail';

const defaultState = { loaded: false };

const entityLoaded = (state) => {
    return {
        ...state,
        loaded: true,
        activeApps: [
            {
                title: 'Resource optimization',
                name: 'resource optimization',
                component: SystemDetail
            }
        ]
    };
};

export const entityDetailReducer = ({ LOAD_ENTITY_FULFILLED }) => applyReducerHash(
    {
        [LOAD_ENTITY_FULFILLED]: entityLoaded
    },
    defaultState
);
