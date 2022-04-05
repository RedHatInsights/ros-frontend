import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components/PageHeader';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import { Button, Card, CardBody } from '@patternfly/react-core';
import { SortByDirection } from '@patternfly/react-table';
import { connect } from 'react-redux';
import { InventoryTable } from '@redhat-cloud-services/frontend-components/Inventory';
import { register } from '../../store';
import './ros-page.scss';
import { entitiesReducer } from '../../store/entitiesReducer';
import { changeSystemColumns, loadIsConfiguredInfo } from '../../store/actions';
import {
    CUSTOM_FILTERS, ROS_API_ROOT,
    SYSTEMS_API_ROOT, SYSTEM_TABLE_COLUMNS,
    WITH_SUGGESTIONS_PARAM, WITH_WAITING_FOR_DATA_PARAM } from '../../constants';
import { ServiceNotConfigured } from '../../Components/ServiceNotConfigured/ServiceNotConfigured';
import { PermissionContext } from '../../App';

import { NotAuthorized } from '@redhat-cloud-services/frontend-components/NotAuthorized';
import { ManageColumnsModal } from '../../Components/Modals/ManageColumnsModal';
import { DownloadSystemsPDFReport } from '../../Components/Reports/SystemsPDFReport';
import { downloadReport } from '../../Components/Reports/DownloadReport';

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
            orderBy: 'report_date',
            orderDirection: SortByDirection.desc,
            stateFilterValue: [],
            isColumnModalOpen: false,
            exportSystemsPDF: false,
            nameFilterValue: '',
            disableExport: true
        };

        this.sortingHeader = {
            display_name: 'display_name', /* eslint-disable-line camelcase */
            os: 'os',
            'performance_utilization.cpu': 'cpu',
            'performance_utilization.memory': 'memory',
            'performance_utilization.max_io': 'max_io',
            number_of_suggestions: 'number_of_suggestions', /* eslint-disable-line camelcase */
            state: 'state',
            report_date: 'report_date' }; /* eslint-disable-line camelcase */

        this.chunkSize = 50;
        this.inventory = React.createRef();
        this.fetchSystems = this.fetchSystems.bind(this);
    }

    async componentDidMount() {
        document.title = 'Resource Optimization - Red Hat Insights';
        insights.chrome?.hideGlobalFilter?.(true);
        insights.chrome.appAction('ros-systems');
        await this.props.isROSConfigured();
        this.processQueryParams();
    }

    processQueryParams() {
        const { location } = this.props;
        const queryParams = new URLSearchParams(location.search);
        const sysWithSuggestionsParam = queryParams.get(WITH_SUGGESTIONS_PARAM);
        const sysWithWaitingParam = queryParams.get(WITH_WAITING_FOR_DATA_PARAM);

        if (sysWithWaitingParam === 'true') {
            this.setState({
                stateFilterValue: ['Waiting for data']
            });
        } else if (sysWithSuggestionsParam === 'true') {
            this.setState({
                stateFilterValue: ['Undersized', 'Oversized', 'Under pressure', 'Idling']
            });
        }
    }

    clearStateQueryParams() {
        const { location } = this.props;
        const url = new URL(window.location);
        const queryParams = new URLSearchParams(location.search);
        const sysWithSuggestionsParam = queryParams.get(WITH_SUGGESTIONS_PARAM);
        const sysWithWaitingParam = queryParams.get(WITH_WAITING_FOR_DATA_PARAM);

        if (sysWithWaitingParam || sysWithSuggestionsParam) {
            queryParams.delete(WITH_SUGGESTIONS_PARAM);
            queryParams.delete(WITH_WAITING_FOR_DATA_PARAM);
            window.history.replaceState(null, '', `${url.origin}${url.pathname}?${queryParams.toString()}${window.location.hash}`);
        }
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
        let query = new URLSearchParams(params);
        fetchParams?.stateFilter?.forEach((stateFilterValue) => {
            query.append('state', stateFilterValue);
        });
        url.search = query.toString();
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

    updateStateFilter = (value) => {
        this.setState({
            stateFilterValue: value
        });
    }

    onDeleteFilters = (e, filtersArr) => {
        const deletedStateFilters = filtersArr.filter((filterObject) => {
            return filterObject.category === 'State';
        });

        if (deletedStateFilters.length > 0) {
            this.clearStateQueryParams();

            const resetFiltersList = deletedStateFilters[0]?.chips.map((chip) =>{
                return chip?.name;
            });
            const activeStateFilters = this.state.stateFilterValue.filter(filterName => !resetFiltersList.includes(filterName));

            this.setState ({
                stateFilterValue: activeStateFilters
            });
        }
    }

    getActiveFilterConfig = () => {
        const activeFilters = this.state.stateFilterValue.map((value)=> ({ name: value }));

        return activeFilters.length > 0
            ? [{
                category: 'State',
                chips: activeFilters
            }]
            : [];
    }

    setColumnModalOpen = (modalState) => {
        this.setState({
            isColumnModalOpen: modalState
        });
    }

    getActiveColumns = () => {
        const { columns } = this.props;
        return columns.filter(column => column.isChecked);
    }

    setExportSystemsPDF(exportSystemsPDF) {
        this.setState({
            exportSystemsPDF
        });
    }

    onExportOptionSelect(fileType) {
        const { stateFilterValue, nameFilterValue, orderBy, orderDirection } = this.state;

        const filters = {
            stateFilter: stateFilterValue,
            hostnameOrId: nameFilterValue
        };

        downloadReport(fileType, filters, orderBy, orderDirection);
    }

    renderConfigStepsOrTable() {
        const { state: SFObject } = CUSTOM_FILTERS;
        const activeColumns = this.getActiveColumns();
        const { exportSystemsPDF, stateFilterValue, nameFilterValue, orderBy, orderDirection } = this.state;

        return (
            this.props.showConfigSteps
                ?   <ServiceNotConfigured/>
                :   <Card className='pf-t-light  pf-m-opaque-100'>
                    <CardBody>
                        <ManageColumnsModal
                            isModalOpen={this.state.isColumnModalOpen}
                            setModalOpen={this.setColumnModalOpen}
                            modalColumns={this.props.columns}
                            saveColumns={(columns) => this.props.changeSystemColumns({ columns })}
                        />
                        <InventoryTable
                            disableDefaultColumns
                            ref={this.inventory}
                            hasCheckbox={ false }
                            tableProps={{
                                canSelectAll: false,
                                className: 'ros-systems-table'
                            }}
                            variant="compact"
                            hideFilters={{ all: true, name: false }}
                            autoRefresh= {true}
                            customFilters={{
                                stateFilter: stateFilterValue
                            }}
                            columns={activeColumns}
                            getEntities={async (_items, config) => {
                                this.setState(() => ({
                                    orderBy: config.orderBy,
                                    orderDirection: config.orderDirection,
                                    nameFilterValue: config.filters?.hostnameOrId
                                }));
                                const results = await this.fetchSystems(
                                    {
                                        page: config.page, perPage: config.per_page,
                                        orderBy: this.sortingHeader[config.orderBy],
                                        orderHow: config.orderDirection,
                                        filters: config.filters,
                                        stateFilter: config.stateFilter
                                    }
                                );

                                const invIds = (results.data || []).map(({ inventory_id: inventoryId }) => inventoryId);
                                const invSystems = await this.fetchInventoryDetails(invIds, {
                                    ...config,
                                    page: 1,
                                    hasItems: true
                                });

                                const disableExport = results?.meta?.count === 0;
                                this.setState(() => ({
                                    disableExport
                                }));

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
                                            INVENTORY_ACTION_TYPES, SYSTEM_TABLE_COLUMNS
                                        )
                                    )
                                });
                                this.props.setSort(this.state.orderBy, this.state.orderDirection, 'CHANGE_SORT');
                            }}
                            expandable='true'
                            filterConfig={{
                                items: [
                                    {
                                        label: SFObject.label,
                                        type: SFObject.type,
                                        value: `checkbox-state`,
                                        filterValues: {
                                            items: SFObject.filterValues.items,
                                            onChange: (_e, values) => this.updateStateFilter(values),
                                            value: stateFilterValue
                                        }
                                    }
                                ]
                            }}
                            activeFiltersConfig={{
                                filters: this.getActiveFilterConfig(),
                                onDelete: this.onDeleteFilters
                            }}
                            actionsConfig={{
                                actions: [
                                    '',
                                    {
                                        label: 'Manage columns',
                                        onClick: () => this.setColumnModalOpen(true)
                                    }
                                ]
                            }}
                            exportConfig={{
                                isDisabled: this.state.disableExport,
                                extraItems: [<Button
                                    key='pdf-download-button' variant='plain'
                                    onClick={() => this.setExportSystemsPDF(true)}>
                                        Export as PDF
                                </Button>],
                                ouiaId: 'export',
                                onSelect: (_event, fileType) => this.onExportOptionSelect(fileType)
                            }}
                            onExpandClick={(_e, _i, isOpen, { id }) => this.props.expandRow(id, isOpen, 'EXPAND_ROW')}
                        >
                        </InventoryTable>
                        {exportSystemsPDF &&
                            <DownloadSystemsPDFReport
                                showButton={false}
                                onSuccess={() => this.setExportSystemsPDF(false)}
                                filters={{
                                    stateFilter: stateFilterValue,
                                    hostnameOrId: nameFilterValue
                                }}
                                orderBy={orderBy}
                                orderHow={orderDirection}
                            />
                        }
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
        isROSConfigured: () => dispatch(loadIsConfiguredInfo()),
        changeSystemColumns: (payload) => dispatch(changeSystemColumns(payload))
    };
}

const mapStateToProps = (state, props) => {
    return {
        showConfigSteps: state.isConfiguredReducer?.showConfigSteps,
        columns: state.systemColumnsReducer.columns,
        ...props
    };
};

RosPage.propTypes = {
    expandRow: PropTypes.func,
    setSort: PropTypes.func,
    isROSConfigured: PropTypes.func,
    showConfigSteps: PropTypes.bool,
    location: PropTypes.object,
    columns: PropTypes.array,
    changeSystemColumns: PropTypes.func
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RosPage));
