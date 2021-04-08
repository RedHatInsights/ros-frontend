import { ROS_API_ROOT, SYSTEMS_API_ROOT } from '../constants';

export function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }

    return response;
}

export const fetchSystemRecommendations = (id, options = {}) => {
    let params = {
        limit: options.perPage,
        offset: (options.page - 1) * options.perPage
    };

    let url = new URL(ROS_API_ROOT + SYSTEMS_API_ROOT + `/${id}/recommedations`,  window.location.origin);
    url.search = new URLSearchParams(params).toString();
    let response = window.insights.chrome.auth
    .getUser()
    .then(() =>
        fetch(url).then(handleErrors)
        .then(res =>  res.json()).then(result => result)
    );

    return response;
};

