import React from 'react';
import { Tooltip } from '@patternfly/react-core';
import {
    ExclamationCircleIcon, ExclamationTriangleIcon, CheckCircleIcon,
    AngleDoubleUpIcon, AngleDoubleDownIcon,
    AutomationIcon, InProgressIcon, TachometerAltIcon
} from '@patternfly/react-icons';

import propTypes from 'prop-types';

const stateDetails = (val) =>  ({
    Oversized: {
        text: 'This system is not fully consuming available resources and may be oversized.',
        icon: <AngleDoubleUpIcon color='#f09800' size='sm'/>
    },
    Undersized: {
        text: 'This system is depleting available resources and may be undersized.',
        icon: <AngleDoubleDownIcon color='red' size='sm'/>
    },
    Idling: {
        text: 'This system displays higher idling cycles than is expected.',
        icon: <AutomationIcon size='sm'/>
    },
    'Storage rightsizing': {
        text: 'This system is experiencing a storage Input/Output bottleneck.',
        icon: <ExclamationTriangleIcon color='#f09800' size='sm'/>
    },
    Optimized: {
        text: 'This system is running efficiently.',
        icon: <CheckCircleIcon color='green' size='sm'/>
    },
    Crashloop: {
        text: 'This system is experiencing a crash loop.',
        icon: <ExclamationCircleIcon color='red' size='sm'/>
    },
    'Waiting for data': {
        text: 'This system is configured, please allow 24 hours for your upload to complete.',
        icon: <InProgressIcon color='#2B9AF3' size='sm'/>
    },
    'Under pressure': {
        text: 'This system in under pressure', // fixme: update it with final text
        icon: <TachometerAltIcon color='#2B9AF3' size='sm'/> //update it based on final icon
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
