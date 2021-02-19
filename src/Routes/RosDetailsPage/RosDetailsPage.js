import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { PrimaryToolbar, TableToolbar } from '@redhat-cloud-services/frontend-components';
import { Main, PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components';
import { Card, CardBody } from '@patternfly/react-core';
import './ros-page.scss';
import { Pagination } from '@patternfly/react-core';
import {fetchRosDetails} from '../../Components/RosTable/redux/actions';
import asyncComponent from '../../Utilities/asyncComponent';
import { routes as paths } from '../package.json';

const RosDetail = ({ match }) => {
    const dispatch = useDispatch();
    const [systemName] = React.useState(match.params.systemId);
    const systemDetails = useSelector();
    React.useEffect(() => {
        dispatch(fetchRosDetails({ systemName }));
    }, []);

    return (
        <React.Fragment>
            <Header
                title={systemName}
                breadcrumbs={[
                    {
                        title: 'Set My Title',
                        to: paths.rosDetails.to,
                        isActive: true
                    },
                    {
                        title: systemName,
                        isActive: true
                    }
                ]}
            >
                

            </Header>
        </React.Fragment>
    );
};

RosDetail.propTypes = {
    match: propTypes.any
};

export default withRouter(RosDetail)