import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Title } from '@patternfly/react-core';
import { Icon } from '@patternfly/react-icons';
import Breadcrumbs from '../Breadcrumbs';
//import { fetchRosDetails } from '../../Components/RosTable/redux/actions';
//import { routes as paths } from '../../../package.json';

const RosDetails = ({ loaded, system }) => {
    if (!loaded) {
        return (
            <div>
                <Icon name='sync-alt'/>
            </div>
        );
    }

    return (
        <React.Fragment>
            <Breadcrumbs name='Resource Optimization' path='/ros' param={system.id}/>
            <Title size='xxl'>{system.display_name}</Title>
            <dl>
                <dt>hostname</dt>
                <dd>{system.display_name}</dd>
                <dt>system id</dt>
                <dd>{system.id}</dd>
            </dl>
        </React.Fragment>
    );
};

RosDetails.propTypes = {
    loaded: PropTypes.bool.isRequired,
    entity: PropTypes.object
};

export default withRouter(RosDetails);
