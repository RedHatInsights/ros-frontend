import { fetchSystemDetail, fetchSystemRecommendations, isROSConfigured } from '../Utilities/api';

export const loadSystemInfo = inventoryId => ({
    type: 'LOAD_ROS_SYSTEM_INFO',
    payload: fetchSystemDetail(inventoryId)
});

export const loadSysRecs = (inventoryId, params) => ({
    type: 'FETCH_SYSTEM_RECOMMENDATIONS_LIST',
    payload: fetchSystemRecommendations(inventoryId, params)
});

export const loadIsConfiguredInfo = () => ({
    type: 'LOAD_IS_CONFIGURED_INFO',
    payload: isROSConfigured()
});
