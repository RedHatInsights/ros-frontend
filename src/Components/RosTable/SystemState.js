import React from 'react';
import { Icon, Tooltip } from '@patternfly/react-core';
import {
    ExclamationCircleIcon, ExclamationTriangleIcon, CheckCircleIcon,
    AngleDoubleUpIcon, AngleDoubleDownIcon,
    AutomationIcon, InProgressIcon, TachometerAltIcon
} from '@patternfly/react-icons';
import './SystemState.scss';

import propTypes from 'prop-types';

const stateDetails = (val) =>  ({
    Oversized: {
        text: 'This system is not fully consuming available resources and may be oversized.',
        icon: <Icon className='oversized-icon' size='md'><AngleDoubleUpIcon /></Icon>
    },
    Undersized: {
        text: 'This system is depleting available resources and may be undersized.',
        icon: <Icon className='undersized-icon' size='md'><AngleDoubleDownIcon /></Icon>
    },
    Idling: {
        text: 'This system displays higher idling cycles than is expected.',
        icon: <Icon className='idling-icon' size='md'><AutomationIcon /></Icon>
    },
    'Storage rightsizing': {
        text: 'This system is experiencing a storage Input/Output bottleneck.',
        icon: <Icon className='rightsizing-icon' size='md'><ExclamationTriangleIcon /></Icon>
    },
    Optimized: {
        text: 'This system is running efficiently.',
        icon: <Icon className='optimized-icon' size='md'><CheckCircleIcon /></Icon>
    },
    Crashloop: {
        text: 'This system is experiencing a crash loop.',
        icon: <Icon className='crashloop-icon'  size='md'><ExclamationCircleIcon /></Icon>
    },
    'Waiting for data': {
        text: 'This system is configured, please allow 24 hours for your upload to complete.',
        icon: <Icon className='waiting-for-data-icon' size='md'><InProgressIcon /></Icon>
    },
    'Under pressure': {
        text: 'System resources adequate but experiencing occasional peaks.',
        icon: <Icon className='under-pressure-icon' size='md'><TachometerAltIcon /></Icon>
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
