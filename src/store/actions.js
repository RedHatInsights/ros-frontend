import { fetchSystemDetail, fetchSystemRecommendations, isROSConfigured, fetchSuggestedInstanceTypes } from '../Utilities/api';

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

export const changeSystemColumns = (payload) =>({
    type: 'CHANGE_SYSTEM_COLUMNS',
    payload
});

export const loadSuggestedInstanceTypes = (params) =>({
    type: 'LOAD_ROS_SYSTEMS',
    payload: fetchSuggestedInstanceTypes(params)
});
