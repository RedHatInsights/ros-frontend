import React, { Suspense } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
const SystemRecommendations = React.lazy(() => import('./SystemRecommendations'));

/**
 * This is a dumb component that only recieves properties from a smart component.
 * Dumb components are usually functions and not classes.
 *
 * @param props the props given by the smart component.
 */

class SystemDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Suspense fallback="">
                <SystemRecommendations inventoryId={this.props.inventoryId}/>
            </Suspense>
        );
    }
}

SystemDetail.propTypes = {
    inventoryId: PropTypes.string
};

export default withRouter(SystemDetail);
