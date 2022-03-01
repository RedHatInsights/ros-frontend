import React from 'react';
import propTypes from 'prop-types';
import {
    DescriptionList,
    DescriptionListTerm,
    DescriptionListGroup,
    DescriptionListDescription
} from '@patternfly/react-core';
import { NO_DATA_VALUE } from '../../constants';

export const ExpandedRow = ({ inventoryId, cloudProvider, instanceType, idlingTime }) =>  {

    const cloudProviderValue = cloudProvider === null ? NO_DATA_VALUE : cloudProvider;
    const instanceTypeValue = instanceType === null ? NO_DATA_VALUE : instanceType;
    const idlingTimeValue = idlingTime === null ? NO_DATA_VALUE : `${idlingTime}%`;

    const inlineFieldsArray = [
        { label: 'Provider', value: cloudProviderValue },
        { label: 'Instance type', value: instanceTypeValue },
        { label: 'Idling time', value: idlingTimeValue }
    ];

    return (
        <DescriptionList className='expanded-row' isCompact isHorizontal>
            <DescriptionListGroup id={inventoryId}>
                {inlineFieldsArray.map((field, index) => (
                    <React.Fragment key={index}>
                        <DescriptionListTerm>{ field.label }</DescriptionListTerm>
                        <DescriptionListDescription>{ field.value }</DescriptionListDescription>
                    </React.Fragment>
                ))}
            </DescriptionListGroup>
        </DescriptionList>
    );
};

ExpandedRow.propTypes = {
    inventoryId: propTypes.string,
    cloudProvider: propTypes.string,
    instanceType: propTypes.string,
    idlingTime: propTypes.string
};
