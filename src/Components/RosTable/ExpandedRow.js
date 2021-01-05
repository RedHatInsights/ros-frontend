import React from 'react';
import propTypes from 'prop-types';
import {
    TextContent,
    TextList,
    TextListVariants,
    TextListItem,
    TextListItemVariants
} from '@patternfly/react-core';

export const ExpandedRow = ({ id, cloudProvider, instanceType, idlingTime, ioWait }) =>  {
    const inlineFieldsArray = [
        { label: 'Provider', value: cloudProvider },
        { label: 'Instance Type', value: instanceType },
        { label: 'Idling time', value: idlingTime },
        { label: 'I/O Wait', value: ioWait }
    ];

    return (
        <TextContent className='expanded-row'>
            <TextList id={id} component={TextListVariants.dl}>
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
    id: propTypes.string,
    cloudProvider: propTypes.string,
    instanceType: propTypes.string,
    idlingTime: propTypes.string,
    ioWait: propTypes.string
};
