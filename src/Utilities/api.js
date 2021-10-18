import { ROS_API_ROOT, SYSTEMS_API_ROOT, IS_CONFIGURED_API } from '../constants';

export function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }

    return response;
}

export const isROSConfigured = () => {
    let url = new URL(
        ROS_API_ROOT + IS_CONFIGURED_API,
        window.location.origin
    );
    let response = window.insights.chrome.auth
    .getUser()
    .then(() =>
        fetch(url).then(handleErrors)
        .then(res =>  res.json()).then(result => result)
    );

    return response;
};

export const fetchSystemDetail = inventoryId => {
    let url = new URL(
        ROS_API_ROOT + SYSTEMS_API_ROOT + `/${inventoryId}`,
        window.location.origin
    );
    let response = window.insights.chrome.auth
    .getUser()
    .then(() =>
        fetch(url).then(handleErrors)
        .then(res =>  res.json()).then(result => result)
    );

    return response;
};

export const fetchSystemRecommendations = (inventoryId, options = {}) => {
    let params = {
        limit: options.perPage,
        offset: (options.page - 1) * options.perPage
    };
    if (options.description && options.description.trim()) {
        params = { ...params, description: options.description };
    }

    let url = new URL(
        ROS_API_ROOT + SYSTEMS_API_ROOT + `/${inventoryId}/suggestions`,
        window.location.origin
    );
    url.search = new URLSearchParams(params).toString();
    let response = window.insights.chrome.auth
    .getUser()
    .then(() =>
        fetch(url).then((resp) => {
            if (!resp.ok && resp.status === 404) {
                return { hasError: true };
            } else if (!resp.ok) {
                throw Error(resp.statusText);
            }

            return resp.json();
        })
        .then(result => result)
    );

    return response;
};

