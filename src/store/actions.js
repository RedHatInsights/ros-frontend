import { fetchSystemDetail, fetchSystemRecommendations } from '../Utilities/api';

export const loadSystemInfo = inventoryId => ({
    type: 'LOAD_ROS_SYSTEM_INFO',
    payload: fetchSystemDetail(inventoryId)
});

export const loadSysRecs = (inventoryId, params) => ({
    type: 'FETCH_SYSTEM_RECOMMENDATIONS_LIST',
    payload: fetchSystemRecommendations(inventoryId, params)
});
