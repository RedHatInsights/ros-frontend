import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Main, PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components';
import { Card, CardBody } from '@patternfly/react-core';
import './ros-page.scss';
import { systemsTableActions } from '../../Components/RosTable/redux';
import asyncComponent from '../../Utilities/asyncComponent';
const RosTable = asyncComponent(() => import('../../Components/RosTable/RosTable'));

/**
 * A smart component that handles all the api calls and data needed by the dumb components.
 * Smart components are usually classes.
 *
 * https://reactjs.org/docs/components-and-props.html
 * https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43
 */

class RosPage extends React.Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        await window.insights.chrome.auth.getUser();
        this.props.fetchSystems();
    }

    render() {
        return (
            <React.Fragment>
                <PageHeader>
                    <PageHeaderTitle title='Resource Optimization'/>
                </PageHeader>
                <Main>
                    <Card className='pf-t-light  pf-m-opaque-100'>
                        <CardBody>
                            <div>
                                { (!this.props.loading) ? (<RosTable systems = { this.props.systemsData }/>) : null }
                            </div>
                        </CardBody>
                    </Card>
                </Main>
            </React.Fragment>
        );
    };
};

function mapStateToProps(state) {
    return {
        loading: state.systemsTableState.RosTable.loading,
        systemsData: state.systemsTableState.RosTable.systemsData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchSystems: (params = {}) => dispatch(systemsTableActions.fetchSystems(params))
    };
}

RosPage.propTypes = {
    loading: PropTypes.bool,
    systemsData: PropTypes.array,
    fetchSystems: PropTypes.func
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RosPage));
