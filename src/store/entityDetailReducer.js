import { applyReducerHash } from '@redhat-cloud-services/frontend-components-utilities/ReducerRegistry';
import Recommendations from '../Components/Recommendations';

const defaultState = { loaded: false };
function entityLoaded(rosDetails, state) {
    return {
        ...state,
        loaded: true,
        activeApps: [
            {
                title: 'Recommendations',
                name: 'ros_recommendations',
                component: Recommendations
            }
        ]
    };
}

/*function rosEntityDetail(state, action) {
    console.log('rosEntityDetail');
    console.log(state);
    console.log(action);
    return {
        ...state,
        ...action.payload.data
    };
}*/

export const entityDetailReducer = ({ LOAD_ENTITY_FULFILLED }, rosDetails) => applyReducerHash(
    {
        [LOAD_ENTITY_FULFILLED]: (state, payload) => entityLoaded(rosDetails, state, payload)
        //, ['FETCH_ROS_SYSTEM_DETAIL_FULFILLED']: rosEntityDetail
    },
    defaultState
);
