import { fetchSystemRecommendations } from '../Utilities/api';

export const loadSysRecs = (uuid, params) => ({
    type: 'FETCH_SYSTEM_RECOMMENDATIONS_LIST',
    payload: fetchSystemRecommendations(uuid, params)
});
