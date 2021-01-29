import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Toolbar, ToolbarItem, ToolbarContent } from '@patternfly/react-core';
import { Main, PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components';
import { Card, CardBody } from '@patternfly/react-core';
import './ros-page.scss';
import { systemsTableActions } from '../../Components/RosTable/redux';
import { Pagination } from '@patternfly/react-core';

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

        this.state = {
            page: 1,
            perPage: 5
        };

        this.onSetPage = this.onSetPage.bind(this);
        this.onPerPageSelect = this.onPerPageSelect.bind(this);
    }

    async componentDidMount() {
        await window.insights.chrome.auth.getUser();
        this.fetchWithParams();
    }

    onSetPage(event, page) {
        const { perPage } = this.state;
        const pagination = { page, perPage };
        this.updatePagination(pagination);
    }

    onPerPageSelect(event, perPage) {
        const page = 1;
        const pagination = { page, perPage };
        this.updatePagination(pagination);
    }

    updatePagination(pagination) {
        this.setState({ page: pagination.page, perPage: pagination.perPage });
        this.fetchWithParams({ page: pagination.page, perPage: pagination.perPage });
    }

    fetchWithParams(fetchParams = {}) {
        const { fetchSystems } = this.props;
        const { page, perPage } = this.state;
        fetchParams = {
            page, perPage,
            ...fetchParams
        };

        fetchSystems(fetchParams);
    }

    render() {
        const { totalSystems, systemsData  } = this.props;
        const { page, perPage } = this.state;

        return (
            <React.Fragment>
                <PageHeader>
                    <PageHeaderTitle title='Resource Optimization'/>
                </PageHeader>
                <Main>
                    <Card className='pf-t-light  pf-m-opaque-100'>
                        <CardBody>
                            <div>
                                <Toolbar className="ros-toolbar">
                                    <ToolbarContent>
                                        <ToolbarItem variant='pagination' align={ { default: 'alignRight' } }>
                                            <Pagination
                                                itemCount={ totalSystems ? totalSystems : 0 }
                                                widgetId={ 'ros-pagination-top' }
                                                page={ totalSystems === 0 ? 0 : page }
                                                perPage={ perPage }
                                                variant='top'
                                                onSetPage={ this.onSetPage }
                                                onPerPageSelect={ this.onPerPageSelect }
                                                isCompact={ true }
                                            />
                                        </ToolbarItem>
                                    </ToolbarContent>
                                </Toolbar>
                                { (!this.props.loading) ? (<RosTable systems = { systemsData }/>) : null }
                                <Pagination
                                    itemCount={ totalSystems ? totalSystems : 0 }
                                    widgetId={ 'ros-pagination-bottom' }
                                    page={ totalSystems === 0 ? 0 : page }
                                    perPage={ perPage }
                                    variant='bottom'
                                    onSetPage={ this.onSetPage }
                                    onPerPageSelect={ this.onPerPageSelect }
                                    isCompact={ false }
                                />

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
        systemsData: state.systemsTableState.RosTable.systemsData,
        totalSystems: state.systemsTableState.RosTable.totalSystems
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
    totalSystems: PropTypes.number,
    fetchSystems: PropTypes.func
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RosPage));
