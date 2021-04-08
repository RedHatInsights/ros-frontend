import React, { Suspense } from 'react';
import PropTypes from 'prop-types';

const SystemRecommendations = React.lazy(() => import('./SystemRecommendations'));

/**
 * This is a dumb component that only recieves properties from a smart component.
 * Dumb components are usually functions and not classes.
 *
 * @param props the props given by the smart component.
 */

const SystemDetail = () => (
    <Suspense fallback="">
        <SystemRecommendations/>
    </Suspense>
);

export default SystemDetail;

/*class SystemDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inventoryId: props.match.params.inventoryId
        };
    }

    render() {
        return (
            <Suspense fallback="">
                <SystemRecommendations/>
            </Suspense>
        );
    }
}

SystemDetail.propTypes = {
    match: PropTypes.any
};
*/