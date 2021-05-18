import React, { Suspense, useEffect, useState, Fragment  } from 'react';
import PropTypes from 'prop-types';
import { connect, Provider } from 'react-redux';
const SystemRecommendations = React.lazy(() => import('./SystemRecommendations'));
import { Bullseye, Spinner } from '@patternfly/react-core';
/**
 * This is a dumb component that only recieves properties from a smart component.
 * Dumb components are usually functions and not classes.
 *
 * @param props the props given by the smart component.
 */

const SystemDetail = (props) => (
    <Suspense fallback="">
        <SystemRecommendations inventoryId={ props.rosSystemInfo.inventory_id }/>
    </Suspense>
);

const mapStateToProps = (state) => {
    return {
        rosSystemInfo: state.systemDetailReducer?.systemInfo
    };
};

SystemDetail.propTypes = {
    rosSystemInfo: PropTypes.object
};

const ConnectedSystemDetail = connect(mapStateToProps, null)(SystemDetail);

const SystemDetailWrapper = ({ getRegistry, ...props }) => {
    const [Wrapper, setWrapper] = useState();
    useEffect(() => {
        setWrapper(() => getRegistry ? Provider : Fragment);
    }, [getRegistry]);

    return Wrapper ? <Wrapper { ...getRegistry && { store: getRegistry().getStore() } }>
        <ConnectedSystemDetail { ...props } /></Wrapper> : <Bullseye><Spinner size="xl" /></Bullseye>;

};

SystemDetailWrapper.propTypes = {
    getRegistry: PropTypes.func
};

export default SystemDetailWrapper;
