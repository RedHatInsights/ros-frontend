import React from 'react';
import { Button } from '@patternfly/react-core';
import propTypes from 'prop-types';

export const ExpandedRow = ({ id, provider, instanceType, idlingType, ioWait }) =>  {
    const inlineFieldsArray = [
        { label: 'Provider', value: provider },
        { label: 'Instance Type', value: instanceType },
        { label: 'Idling type', value: idlingType },
        { label: 'I/O Wait', value: ioWait }
    ];

    const inlineFieldsContent = inlineFieldsArray.map((field, index) =>
        <div key={index} className='pf-c-description-list__group'>
            <dt className='pf-c-description-list__term'>
                <span className='pf-c-description-list__text'>{ field.label }:</span>
            </dt>
            <dd className='pf-c-description-list__description'>
                <div className='pf-c-description-list__text'>{  field.value }</div>
            </dd>
        </div>
    );

    return (
        <dl  id={id} className='pf-c-description-list pf-m-horizontal'>
            { inlineFieldsContent }
            <div className='pf-c-description-list__group'>
                <dt className='pf-c-description-list__term'>
                    <Button variant="primary">X Recommendations</Button>
                </dt>
            </div>
        </dl>
    );
};

ExpandedRow.propTypes = {
    id: propTypes.string,
    provider: propTypes.string,
    instanceType: propTypes.string,
    idlingType: propTypes.string,
    ioWait: propTypes.string
};
