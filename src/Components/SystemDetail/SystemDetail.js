import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
const SystemRecommendations = React.lazy(() => import('./SystemRecommendations'));

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

export default connect(mapStateToProps, null)(SystemDetail);
