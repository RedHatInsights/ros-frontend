import React from 'react';
import propTypes from 'prop-types';
import {
    TextContent,
    TextList,
    TextListVariants,
    TextListItem,
    TextListItemVariants
} from '@patternfly/react-core';
import { NO_DATA_VALUE } from '../../constants';

export const ExpandedRow = ({ inventoryId, cloudProvider, instanceType, idlingTime, ioWait }) =>  {

    const cloudProviderValue = cloudProvider === null ? NO_DATA_VALUE : cloudProvider;
    const instanceTypeValue = instanceType === null ? NO_DATA_VALUE : instanceType;
    const idlingTimeValue = idlingTime === null ? NO_DATA_VALUE : `${idlingTime}%`;
    const ioWaitValue = ioWait === null ? NO_DATA_VALUE : `${ioWait}%`;

    const inlineFieldsArray = [
        { label: 'Provider', value: cloudProviderValue },
        { label: 'Instance type', value: instanceTypeValue },
        { label: 'Idling time', value: idlingTimeValue },
        { label: 'I/O wait', value: ioWaitValue }
    ];

    return (
        <TextContent className='expanded-row'>
            <TextList id={inventoryId} component={TextListVariants.dl}>
                { inlineFieldsArray.map((field, index) => (
                    <React.Fragment key={index} >
                        <TextListItem component={TextListItemVariants.dt}>{ field.label }</TextListItem>
                        <TextListItem component={TextListItemVariants.dd}>{ field.value }</TextListItem>
                    </React.Fragment>
                ))}
            </TextList>
        </TextContent>
    );
};

ExpandedRow.propTypes = {
    inventoryId: propTypes.string,
    cloudProvider: propTypes.string,
    instanceType: propTypes.string,
    idlingTime: propTypes.string,
    ioWait: propTypes.string
};
