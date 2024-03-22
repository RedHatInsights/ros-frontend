import React from 'react';
import { Icon, Tooltip } from '@patternfly/react-core';
import {
    ExclamationCircleIcon, ExclamationTriangleIcon, CheckCircleIcon,
    AngleDoubleUpIcon, AngleDoubleDownIcon,
    AutomationIcon, InProgressIcon, TachometerAltIcon
} from '@patternfly/react-icons';

import propTypes from 'prop-types';

const stateDetails = (val) =>  ({
    Oversized: {
        text: 'This system is not fully consuming available resources and may be oversized.',
        icon: <Icon color='#f09800' size='sm'><AngleDoubleUpIcon /></Icon>
    },
    Undersized: {
        text: 'This system is depleting available resources and may be undersized.',
        icon: <Icon color='red' size='sm'><AngleDoubleDownIcon /></Icon>
    },
    Idling: {
        text: 'This system displays higher idling cycles than is expected.',
        icon: <Icon size='sm'><AutomationIcon /></Icon>
    },
    'Storage rightsizing': {
        text: 'This system is experiencing a storage Input/Output bottleneck.',
        icon: <Icon color='#f09800' size='sm'><ExclamationTriangleIcon /></Icon>
    },
    Optimized: {
        text: 'This system is running efficiently.',
        icon: <Icon color='green' size='sm'><CheckCircleIcon /></Icon>
    },
    Crashloop: {
        text: 'This system is experiencing a crash loop.',
        icon: <Icon color='red' size='sm'><ExclamationCircleIcon /></Icon>
    },
    'Waiting for data': {
        text: 'This system is configured, please allow 24 hours for your upload to complete.',
        icon: <Icon color='#2B9AF3' size='sm'><InProgressIcon /></Icon>
    },
    'Under pressure': {
        text: 'System resources adequate but experiencing occasional peaks.',
        icon: <Icon color='#030303' size='sm'><TachometerAltIcon /></Icon>
    }
}[val] || {});

export const SystemState = ({ stateValue }) =>  {
    const { text, icon } = stateDetails(stateValue);
    return (
        <span>
            <span>
                { text ?
                    <Tooltip content={<div>{ text }</div>}>
                        <span>{ icon } { stateValue }</span>
                    </Tooltip>
                    : stateValue }
            </span>
        </span>
    );
};

SystemState.propTypes = {
    stateValue: propTypes.string
};
