// import PropTypes from 'prop-types';
import React, { Suspense } from 'react';

/**
 * This is a dumb component that only recieves properties from a smart component.
 * Dumb components are usually functions and not classes.
 *
 * @param props the props given by the smart component.
 */
const Recommendations = () => {
    return (
        <Suspense fallback="">
            <span className='sample-component'>Recommendations</span>
        </Suspense>
    );
};

export default Recommendations;
