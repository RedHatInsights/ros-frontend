import React from 'react';
import { Tooltip } from '@patternfly/react-core';
import { displayState, recommendations, scoreProgress, systemName } from './store/entitiesReducer';
import { diskUsageData, displayOS } from './Components/RosTable/RenderColumn';

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
export const WITH_SUGGESTIONS_PARAM = 'with_suggestions';
export const WITH_WAITING_FOR_DATA_PARAM = 'with_waiting_for_data';

// Systems table columns

export const SYSTEM_TABLE_COLUMNS = [
    {
        key: 'display_name',
        title: 'Name',
        modalTitle: 'Name',
        renderFunc: (data, id, item) => systemName(data, id, item),
        isChecked: true,
        isDisabled: true,
        isShownByDefault: true
    },
    {
        key: 'os',
        title: (
            <Tooltip content={<span>Operating system</span>}>
                <span>OS</span>
            </Tooltip>
        ),
        modalTitle: 'Operating system',
        dataLabel: 'Operating system',
        renderFunc: (data) => displayOS(data),
        props: { isStatic: true },
        isChecked: true,
        isDisabled: false,
        isShownByDefault: true
    },
    {
        key: 'performance_utilization.cpu',
        title: 'CPU utilization',
        modalTitle: 'CPU utilization',
        renderFunc: (data, id, item) => scoreProgress(data, id, item),
        isChecked: true,
        isDisabled: false,
        isShownByDefault: true
    },
    {
        key: 'performance_utilization.memory',
        title: 'Memory utilization',
        modalTitle: 'Memory utilization',
        renderFunc: (data, id, item) => scoreProgress(data, id, item),
        isChecked: true,
        isDisabled: false,
        isShownByDefault: true
    },
    {
        key: 'performance_utilization.max_io',
        title: (
            <Tooltip content={<span>IOPS</span>}>
                <span>I/O utilization</span>
            </Tooltip>
        ),
        modalTitle: 'I/O utilization',
        dataLabel: 'I/O utilization',
        renderFunc: (data, id, item) => diskUsageData(data, id, item),
        isChecked: true,
        isDisabled: false,
        isShownByDefault: true
    },
    {
        key: 'number_of_suggestions',
        title: 'Suggestions',
        modalTitle: 'Suggestions',
        renderFunc: (data, id, item) => recommendations(data, id, item),
        isChecked: true,
        isDisabled: false,
        isShownByDefault: true
    },
    {
        key: 'state',
        title: 'State',
        modalTitle: 'State',
        renderFunc: (data) => displayState(data),
        isChecked: true,
        isDisabled: false,
        isShownByDefault: true
    }
];
