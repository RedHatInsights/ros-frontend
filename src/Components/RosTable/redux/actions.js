import { ROS_API_ROOT, SYSTEMS_API_ROOT } from '../../../constants';

function fetchSystems(params = {}) {
    let url = new URL(ROS_API_ROOT + SYSTEMS_API_ROOT);
    url.search = new URLSearchParams(params).toString();
    return {
        type: 'FETCH_CLOUD_SYSTEMS_LIST',
        payload: fetch(url).then(handleErrors)
        .then(res =>  res.json())
        .then(json => { return json.results; })
        .catch(error => { return error; })
    };
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }

    return response;
}

export default {
    fetchSystems
};
