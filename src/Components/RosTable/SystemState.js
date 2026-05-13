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
        icon: <Icon status='warning' size='md'><AngleDoubleUpIcon /></Icon>
    },
    Undersized: {
        text: 'This system is depleting available resources and may be undersized.',
        icon: <Icon status='danger' size='md'><AngleDoubleDownIcon /></Icon>
    },
    Idling: {
        text: 'This system displays higher idling cycles than is expected.',
        icon: <Icon size='md'><AutomationIcon /></Icon>
    },
    'Storage rightsizing': {
        text: 'This system is experiencing a storage Input/Output bottleneck.',
        icon: <Icon status='warning' size='md'><ExclamationTriangleIcon /></Icon>
    },
    Optimized: {
        text: 'This system is running efficiently.',
        icon: <Icon status='success' size='md'><CheckCircleIcon /></Icon>
    },
    Crashloop: {
        text: 'This system is experiencing a crash loop.',
        icon: <Icon status='danger' size='md'><ExclamationCircleIcon /></Icon>
    },
    'Waiting for data': {
        text: 'This system is configured, please allow 24 hours for your upload to complete.',
        icon: <Icon size='md'><InProgressIcon /></Icon>
    },
    'Under pressure': {
        text: 'System resources adequate but experiencing occasional peaks.',
        icon: <Icon size='md'><TachometerAltIcon /></Icon>
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
