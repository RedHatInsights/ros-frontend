import { SortByDirection } from '@patternfly/react-table';
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

export const fetchSystems = async (fetchParams) => {
    await window.insights.chrome.auth.getUser();

    const { perPage, orderBy, orderHow  } = fetchParams || {};

    const sortingHeader = {
        display_name: 'display_name', /* eslint-disable-line camelcase */
        os: 'os',
        'performance_utilization.cpu': 'cpu',
        'performance_utilization.memory': 'memory',
        'performance_utilization.max_io': 'max_io',
        number_of_suggestions: 'number_of_suggestions', /* eslint-disable-line camelcase */
        state: 'state',
        report_date: 'report_date' /* eslint-disable-line camelcase */
    };

    let params = {
        order_by: sortingHeader[orderBy] || 'report_date', /* eslint-disable-line camelcase */
        order_how: orderHow || SortByDirection.desc, /* eslint-disable-line camelcase */
        limit: perPage ? perPage : -1,
        ...fetchParams?.page && {
            offset: (fetchParams.page - 1) * fetchParams.perPage
        },
        ...fetchParams?.filters?.hostnameOrId && {
            display_name: fetchParams.filters.hostnameOrId /* eslint-disable-line camelcase */
        }
    };

    let url = new URL(ROS_API_ROOT + SYSTEMS_API_ROOT,  window.location.origin);
    let query = new URLSearchParams(params);
    fetchParams?.stateFilter?.forEach((stateFilterValue) => {
        query.append('state', stateFilterValue);
    });
    fetchParams?.osFilter?.forEach((osFilterValue) => {
        query.append('os', osFilterValue);
    });
    url.search = query.toString();
    return fetch(url).then((res) => {
        if (!res.ok) {
            throw Error(res.statusText);
        }

        return res;
    }).then(res =>  res.json());
};

