import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components/PageHeader';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import { Card, CardBody } from '@patternfly/react-core';
import { SortByDirection } from '@patternfly/react-table';
import { connect } from 'react-redux';
import { InventoryTable } from '@redhat-cloud-services/frontend-components/Inventory';
import { register } from '../../store';
import './ros-page.scss';
import { entitiesReducer, systemName, scoreProgress, recommendations, displayState } from '../../store/entitiesReducer';
import { loadIsConfiguredInfo } from '../../store/actions';
import { ROS_API_ROOT, SYSTEMS_API_ROOT } from '../../constants';
import { ServiceNotConfigured } from '../../Components/ServiceNotConfigured/ServiceNotConfigured';
import { PermissionContext } from '../../App';

import { NotAuthorized } from '@redhat-cloud-services/frontend-components/NotAuthorized';

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
            perPage: 10,
            orderBy: 'display_name',
            orderDirection: SortByDirection.asc,
            columns: [
                { key: 'display_name', title: 'Name', renderFunc: systemName },
                { key: 'performance_utilization.cpu', title: 'CPU utilization', renderFunc: scoreProgress('cpu') },
                { key: 'performance_utilization.memory', title: 'Memory utilization', renderFunc: scoreProgress('memory') },
                { key: 'performance_utilization.io', title: 'I/O utilization', renderFunc: scoreProgress('io') },
                { key: 'number_of_suggestions', title: 'Suggestions',
                    renderFunc: recommendations },
                { key: 'state', title: 'State', renderFunc: displayState }
            ]
        };

        this.sortingHeader = {
            display_name: 'display_name', /* eslint-disable-line camelcase */
            'performance_utilization.cpu': 'cpu',
            'performance_utilization.memory': 'memory',
            'performance_utilization.io': 'io',
            number_of_suggestions: 'number_of_suggestions', /* eslint-disable-line camelcase */
            state: 'state' };

        this.chunkSize = 50;
        this.inventory = React.createRef();
        this.fetchSystems = this.fetchSystems.bind(this);
    }

    async componentDidMount() {
        insights.chrome?.hideGlobalFilter?.(true);
        insights.chrome.appAction('ros-systems');
        await this.props.isROSConfigured();
    }

    async fetchSystems(fetchParams) {
        await window.insights.chrome.auth.getUser();
        let params = {
            limit: fetchParams.perPage,
            offset: (fetchParams.page - 1) * fetchParams.perPage,
            order_by: fetchParams.orderBy || this.state.orderBy, /* eslint-disable-line camelcase */
            order_how: fetchParams.orderHow || this.state.orderDirection, /* eslint-disable-line camelcase */
            ...fetchParams?.filters?.hostnameOrId && {
                display_name: fetchParams.filters.hostnameOrId /* eslint-disable-line camelcase */
            }
        };

        let url = new URL(ROS_API_ROOT + SYSTEMS_API_ROOT,  window.location.origin);
        url.search = new URLSearchParams(params).toString();
        return fetch(url).then((res) => {
            if (!res.ok) {
                throw Error(res.statusText);
            }

            return res;
        }).then(res =>  res.json());
    }

    chunkIdsArray(ids) {
        let idsChunks = [];
        while (ids.length) {
            idsChunks.push(ids.splice(0, this.chunkSize));
        }

        return idsChunks;
    }

    async fetchInventoryDetails(invIds, configOptns) {
        let results = [];
        if (configOptns.per_page > 50 && invIds.length > 50) {
            let recordsSubset = await this.multipleGetEntitiesRequests(invIds, configOptns);
            recordsSubset.map((records) => {
                results.push(...records);
            });
        } else {
            const response = await this.state.getEntities?.(invIds, configOptns, false);
            results = response.results;
        }

        return results;
    }

    async multipleGetEntitiesRequests(invIds, configOptns) {
        const idsInBatches = this.chunkIdsArray(invIds);
        return Promise.all(
            idsInBatches.map(async (ids) => {
                let resp = await this.state.getEntities?.(ids, configOptns, false);
                let respJSON = resp.results;
                return respJSON;
            })
        ).then((results) => results);
    }

    renderConfigStepsOrTable() {
        return (
            this.props.showConfigSteps
                ?   <ServiceNotConfigured/>
                :   <Card className='pf-t-light  pf-m-opaque-100'>
                    <CardBody>
                        <InventoryTable
                            disableDefaultColumns
                            ref={this.inventory}
                            hasCheckbox={ false }
                            tableProps={{
                                canSelectAll: false,
                                className: 'ros-systems-table'
                            }}
                            variant="compact"
                            hideFilters={{ stale: true, registeredWith: true }}
                            getEntities={async (_items, config) => {
                                this.setState(() => ({
                                    orderBy: config.orderBy,
                                    orderDirection: config.orderDirection
                                }));
                                const results = await this.fetchSystems(
                                    { page: config.page, perPage: config.per_page,
                                        orderBy: this.sortingHeader[config.orderBy],
                                        orderHow: config.orderDirection,
                                        filters: config.filters
                                    }
                                );
                                const invIds = (results.data || []).map(({ inventory_id: inventoryId }) => inventoryId);
                                const invSystems = await this.fetchInventoryDetails(invIds, {
                                    ...config,
                                    page: 1,
                                    hasItems: true
                                });
                                return {
                                    results: results.data.map((system) => {
                                        const invRec = invSystems.find(({ id }) => id === system.inventory_id);
                                        return ({
                                            ...invRec,
                                            ...(invRec ? { isDeleted: false } : { id: system.inventory_id, isDeleted: true }),
                                            ...system
                                        });
                                    }),
                                    total: results.meta.count,
                                    page: config.page,
                                    per_page: config.per_page /* eslint-disable-line camelcase */
                                };
                            }}
                            onLoad={({ mergeWithEntities, INVENTORY_ACTION_TYPES, api }) => {
                                this.setState({
                                    getEntities: api?.getEntities
                                });
                                register({
                                    ...mergeWithEntities(
                                        entitiesReducer(
                                            INVENTORY_ACTION_TYPES, this.state.columns
                                        )
                                    )
                                });
                                this.props.setSort(this.state.orderBy, this.state.orderDirection, 'CHANGE_SORT');
                            }}
                            expandable='true'
                            onExpandClick={(_e, _i, isOpen, { id }) => this.props.expandRow(id, isOpen, 'EXPAND_ROW')}
                        >
                        </InventoryTable>
                    </CardBody>
                </Card>
        );
    }

    render() {
        return (
            <React.Fragment>
                <PageHeader>
                    <PageHeaderTitle title='Resource Optimization'/>
                </PageHeader>
                <Main>
                    <PermissionContext.Consumer>
                        { value =>
                            value.permissions.systemsRead === false
                                ? <NotAuthorized serviceName='Resource Optimization' />
                                :  this.renderConfigStepsOrTable()
                        }
                    </PermissionContext.Consumer>
                </Main>
            </React.Fragment>
        );
    };
};

function mapDispatchToProps(dispatch) {
    return {
        expandRow: (id, isOpen, actionType) => dispatch({
            type: actionType,
            payload: { id, isOpen }
        }),
        setSort: (orderByKey, orderByDirection, actionType) => dispatch({
            type: actionType,
            payload: {
                key: orderByKey,
                direction: orderByDirection
            }
        }),
        isROSConfigured: () => dispatch(loadIsConfiguredInfo())
    };
}

const mapStateToProps = (state, props) => {
    return {
        showConfigSteps: state.isConfiguredReducer?.showConfigSteps,
        ...props
    };
};

RosPage.propTypes = {
    expandRow: PropTypes.func,
    setSort: PropTypes.func,
    isROSConfigured: PropTypes.func,
    showConfigSteps: PropTypes.bool
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RosPage));
