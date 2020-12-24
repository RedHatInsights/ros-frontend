import React from 'react';
import propTypes from 'prop-types';

export const ExpandedRow = ({ id, cloudProvider, instanceType, idlingTime, ioWait }) =>  {
    const inlineFieldsArray = [
        { label: 'Provider', value: cloudProvider },
        { label: 'Instance Type', value: instanceType },
        { label: 'Idling time', value: idlingTime },
        { label: 'I/O Wait', value: ioWait }
    ];

    const inlineFieldsContent = inlineFieldsArray.map((field, index) =>
        <div key={index} className='pf-c-description-list__group'>
            <dt className='pf-c-description-list__term'>
                <span className='pf-c-description-list__text'>{ field.label }</span>
            </dt>
            <dd className='pf-c-description-list__description'>
                <div className='pf-c-description-list__text'>{  field.value }</div>
            </dd>
        </div>
    );

    return (
        <dl  id={id} className='pf-c-description-list pf-m-horizontal'>
            { inlineFieldsContent }
        </dl>
    );
};

ExpandedRow.propTypes = {
    id: propTypes.string,
    cloudProvider: propTypes.string,
    instanceType: propTypes.string,
    idlingTime: propTypes.string,
    ioWait: propTypes.string
};
