import { ROS_API_ROOT, SYSTEMS_API_ROOT } from '../../../constants';

function fetchSystems(fetchParams = {}) {
    let params = {};
    params.limit = fetchParams.perPage;
    params.offset = (fetchParams.page - 1) * fetchParams.perPage;

    let url = new URL(ROS_API_ROOT + SYSTEMS_API_ROOT,  window.location.origin);
    url.search = new URLSearchParams(params).toString();
    return {
        type: 'FETCH_CLOUD_SYSTEMS_LIST',
        payload: fetch(url).then(handleErrors)
        .then(res =>  res.json())
    };
}

//function fetchRosDetails(fetchParams = {}) {

//}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }

    return response;
}

export default {
    fetchSystems
};
