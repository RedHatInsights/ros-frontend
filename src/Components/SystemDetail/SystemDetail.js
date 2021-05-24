import React, { Suspense, useEffect, useState, Fragment  } from 'react';
import PropTypes from 'prop-types';
import { Provider, useSelector } from 'react-redux';
const SystemRecommendations = React.lazy(() => import('./SystemRecommendations'));
import { systemRecsReducer } from '../../store/reducers';
import { Bullseye, Spinner } from '@patternfly/react-core';
/**
 * This is a dumb component that only recieves properties from a smart component.
 * Dumb components are usually functions and not classes.
 *
 * @param props the props given by the smart component.
 */

const SystemDetail = (props) => {
    const inventoryId = useSelector(({ entityDetails }) => entityDetails?.entity?.id);

    return (
        <Suspense fallback="">
            <SystemRecommendations inventoryId={ inventoryId } {...props}/>
        </Suspense>
    );
};

const SystemDetailWrapper = ({ getRegistry, ...props }) => {
    const [Wrapper, setWrapper] = useState();
    useEffect(() => {
        if (getRegistry) {
            getRegistry()?.register?.({ systemRecsReducer });
        }

        setWrapper(() => getRegistry ? Provider : Fragment);
    }, [getRegistry]);

    return Wrapper ? <Wrapper { ...getRegistry && { store: getRegistry().getStore() } }>
        <SystemDetail { ...props } /></Wrapper> : <Bullseye><Spinner size="xl" /></Bullseye>;

};

SystemDetailWrapper.propTypes = {
    getRegistry: PropTypes.func
};

export default SystemDetailWrapper;
