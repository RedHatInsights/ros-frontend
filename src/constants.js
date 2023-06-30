import React from 'react';
import { nowrap } from '@patternfly/react-table';
import { Tooltip } from '@patternfly/react-core';
import {
    displayState,
    recommendations,
    scoreProgress,
    systemName
} from './store/entitiesReducer';
import {
    diskUsageData,
    displayLastReported,
    displayOS
} from './Components/RosTable/RenderColumn';

// API
export const ROS_API_ROOT = '/api/ros/v1';
export const IS_CONFIGURED_API = '/is_configured';
export const SYSTEMS_API_ROOT = '/systems';
export const RECOMMENDATION_RATING_API = '/rating';
export const CRC_PDF_GENERATE_API = '/api/crc-pdf-generator/v1/generate';

// Feedback
export const NEGATIVE_FEEDBACK = -1;
export const NEUTRAL_FEEDBACK = 0;
export const POSITIVE_FEEDBACK = 1;

// No Data State
export const NO_DATA_STATE = 'Waiting for data';
export const NO_DATA_VALUE = 'N/A';

// PSI Enabling URL
// eslint-disable-next-line max-len
export const ENABLE_PSI_URL = 'https://access.redhat.com/documentation/en-us/red_hat_insights/2023/html-single/assessing_and_monitoring_rhel_resource_optimization_with_insights_for_red_hat_enterprise_linux/index#proc-ros-psi-enable__assembly-ros-install';

// Service name
export const SERVICE_NAME = 'Resource Optimization';

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
    },
    {
        key: 'report_date',
        title: 'Last reported',
        modalTitle: 'Last reported',
        renderFunc: (data) => displayLastReported(data),
        isChecked: true,
        isDisabled: false,
        isShownByDefault: true,
        transforms: [nowrap],
        cellTransforms: [nowrap]
    }
];

// Historical Chart
export const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

export const DATE_RANGE_7_DAYS = 7;
export const DATE_RANGE_49_DAYS = 49;
export const RANGE_DROPDOWN_45_DAYS = 45;
