import React from 'react';
import { Button } from '@patternfly/react-core';
import propTypes from 'prop-types';

export const ExpandedRow = ({ id, provider, instanceType, idlingType, ioWait }) =>  (
    <dl className='pf-c-description-list pf-m-horizontal'>
        <div id={id} className='pf-c-description-list__group'>
            <dt className='pf-c-description-list__term'>
                <span className='pf-c-description-list__text'>Provider:</span>
            </dt>
            <dd className='pf-c-description-list__description'>
                <div className='pf-c-description-list__text'>{ provider }</div>
            </dd>
        </div>
        <div className='pf-c-description-list__group'>
            <dt className='pf-c-description-list__term'>
                <span className='pf-c-description-list__text'>Instance Type:</span>
            </dt>
            <dd className='pf-c-description-list__description'>
                <div className='pf-c-description-list__text'>{ instanceType }</div>
            </dd>
        </div>
        <div className='pf-c-description-list__group'>
            <dt className='pf-c-description-list__term'>
                <span className='pf-c-description-list__text'>Idling type:</span>
            </dt>
            <dd className='pf-c-description-list__description'>
                <div className='pf-c-description-list__text'>{ idlingType }</div>
            </dd>
        </div>
        <div className='pf-c-description-list__group'>
            <dt className='pf-c-description-list__term'>
                <span className='pf-c-description-list__text'>I/O Wait</span>
            </dt>
            <dd className='pf-c-description-list__description'>
                <div className='pf-c-description-list__text'>{ ioWait }</div>
            </dd>
        </div>
        <div className='pf-c-description-list__group'>
            <dt className='pf-c-description-list__term'>
                <Button variant="primary">X Recommendations</Button>
            </dt>
        </div>
    </dl>
);

ExpandedRow.propTypes = {
    id: propTypes.string,
    provider: propTypes.string,
    instanceType: propTypes.string,
    idlingType: propTypes.string,
    ioWait: propTypes.string
};
