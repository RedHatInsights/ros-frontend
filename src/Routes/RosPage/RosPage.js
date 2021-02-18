import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PrimaryToolbar } from '@redhat-cloud-services/frontend-components/PrimaryToolbar';
import { TableToolbar } from '@redhat-cloud-services/frontend-components/TableToolbar';
import { PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components/PageHeader';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import { Card, CardBody } from '@patternfly/react-core';
import './ros-page.scss';
import { systemsTableActions } from '../../Components/RosTable/redux';
import { Pagination } from '@patternfly/react-core';

import { InventoryTable } from '@redhat-cloud-services/frontend-components/components/cjs/Inventory';
import { register } from '../../store';
import { entityDetailReducer } from '../../Components/RosTable/redux';

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
            perPage: 10
        };

        this.inventory = null;
        this.setInventoryRef = element => { this.inventory = element; };

    }

    async componentDidMount() {
        await window.insights.chrome.auth.getUser();
        this.props.fetchSystems({ page: this.state.page, perPage: this.state.perPage });
    }

    updatePagination(pagination) {
        this.setState(pagination);
        this.props.fetchSystems(pagination);
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
                            <PrimaryToolbar className="ros-primary-toolbar" pagination={{
                                page: (totalSystems === 0 ? 0 : page),
                                perPage,
                                itemCount: (totalSystems ? totalSystems : 0),
                                onSetPage: (_e, page) => this.updatePagination({ page, perPage: this.state.perPage }),
                                onPerPageSelect: (_e, perPage) => this.updatePagination({ page: 1, perPage }),
                                isCompact: true,
                                widgetId: 'ros-pagination-top'
                            }}
                            />
                            { (!this.props.loading) ? (<RosTable systems = { systemsData }/>) : null }
                            <InventoryTable
                                ref={this.setInventoryRef}
                                page={1}
                                tableProps={{
                                    canSelectAll: false
                                }}
                                getEntities={async (_items, config) => {
                                    console.log('------------->>>>>>>>>>>');
                                    console.log('getEntities');
                                    console.log(config);
                                    const { results } = systemsData;
                                    const data = await this.state.getEntities?.(
                                        (results || []).map(({ uuid }) => uuid),
                                        {
                                            ...config,
                                            hasItems: true
                                        },
                                        false
                                    );
                                    console.log(results);
                                    console.log(data);
                                    console.log('done!!');
                                    return data;
                                }}
                                onLoad={({ mergeWithEntities, INVENTORY_ACTION_TYPES, api }) => {
                                    this.setState({
                                        getEntities: (() => api?.getEntities),
                                        unregister: (() =>
                                            register({
                                                ...mergeWithEntities(entityDetailReducer(INVENTORY_ACTION_TYPES))
                                            })
                                        )
                                    });
                                }}
                            />
                            <TableToolbar>
                                <Pagination
                                    itemCount={ totalSystems ? totalSystems : 0 }
                                    widgetId='ros-pagination-bottom'
                                    page={ totalSystems === 0 ? 0 : page }
                                    perPage={ perPage }
                                    variant='bottom'
                                    onSetPage={(_e, page) => this.updatePagination({ page, perPage: this.state.perPage })}
                                    onPerPageSelect={(_e, perPage) => this.updatePagination({ page: 1, perPage })}
                                />
                            </TableToolbar>
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
