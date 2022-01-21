// API
export const ROS_API_ROOT = '/api/ros/v1';
export const IS_CONFIGURED_API = '/is_configured';
export const SYSTEMS_API_ROOT = '/systems';
export const RECOMMENDATION_RATING_API = '/rating';

// Feedback
export const NEGATIVE_FEEDBACK = -1;
export const NEUTRAL_FEEDBACK = 0;
export const POSITIVE_FEEDBACK = 1;

// No Data State
export const NO_DATA_STATE = 'Waiting for data';
export const NO_DATA_VALUE = 'N/A';

// Getting started URL
// eslint-disable-next-line max-len
export const GETTING_STARTED_URL = 'https://access.redhat.com/documentation/en-us/red_hat_insights/2022/html/assessing_and_monitoring_rhel_resource_optimization_with_insights_for_red_hat_enterprise_linux/proc-ros-install_ros-getting-started';

// Custom Filters
export const CUSTOM_FILTERS = {
    state: {
        label: 'State',
        type: 'checkbox',
        filterValues: {
            items: [
                {
                    label: 'Idling',
                    value: 'Idling'
                },
                {
                    label: 'Optimized',
                    value: 'Optimized'
                },
                {
                    label: 'Oversized',
                    value: 'Oversized'
                },
                {
                    label: 'Under pressure',
                    value: 'Under pressure'
                },
                {
                    label: 'Undersized',
                    value: 'Undersized'
                },
                {
                    label: 'Waiting for data',
                    value: 'Waiting for data'
                }
            ]
        }
    }
};

// Query params for state filters
export const WAITING_SYSTEMS_VALUE = 'waiting';
export const SUGGESTIONS_SYSTEMS_VALUE = 'suggestions';
