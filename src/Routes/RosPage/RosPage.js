import React from 'react';
import PropTypes from 'prop-types';
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
    PAGE,
    PER_PAGE,
    CUSTOM_FILTERS, ROS_API_ROOT,
    SYSTEMS_API_ROOT, SYSTEM_TABLE_COLUMNS,
    WITH_SUGGESTIONS_PARAM, WITH_WAITING_FOR_DATA_PARAM,
    SERVICE_NAME
} from '../../constants';
import { ServiceNotConfigured } from '../../Components/ServiceNotConfigured/ServiceNotConfigured';
import { PermissionContext } from '../../App';

import { NotAuthorized } from '@redhat-cloud-services/frontend-components/NotAuthorized';
import { ManageColumnsModal } from '../../Components/Modals/ManageColumnsModal';
import { DownloadSystemsPDFReport } from '../../Components/Reports/SystemsPDFReport';
import { downloadReport } from '../../Components/Reports/DownloadReport';
import {
    addNotification,
    clearNotifications
} from '@redhat-cloud-services/frontend-components-notifications/redux';
import { DownloadExecutivePDFReport } from '../../Components/Reports/ExecutivePDFReport';
import { useChrome } from '@redhat-cloud-services/frontend-components/useChrome';
import { conditionalFilterType } from '@redhat-cloud-services/frontend-components';
import useFeatureFlag from './useFeatureFlag';
import { displayGroup } from '../../Components/RosTable/RenderColumn';
import { useLocation } from 'react-router-dom';

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
            perPage: PER_PAGE,
            orderBy: 'report_date',
            orderDirection: SortByDirection.desc,
            stateFilterValue: [],
            isColumnModalOpen: false,
            exportSystemsPDF: false,
            nameFilterValue: '',
            groupFilterValue: [],
            disableExport: true,
            osFilterValue: [],
            OSFObject: {}
        };

        this.sortingHeader = {
            display_name: 'display_name', /* eslint-disable-line camelcase */
            group_name: 'group_name', /* eslint-disable-line camelcase */
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
        const chrome = this.props.chrome;
        chrome?.hideGlobalFilter?.(true);
        chrome?.appAction('ros-systems');
        await this.props.isROSConfigured();
        this.processQueryParams();
        this.processFilterValues();
        if (this.props.groupsEnabled) {
            SYSTEM_TABLE_COLUMNS.splice(1, 0,  {
                key: 'groups',
                title: 'Group',
                modalTitle: 'Group',
                dataLabel: 'Group',
                renderFunc: (data) => displayGroup(data),
                isChecked: true,
                isDisabled: false,
                isShownByDefault: true,
                props: { isStatic: true }
            });
        }
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

    processFilterValues() {
        let osObject = {};
        osObject.label = 'Operating system';
        osObject.type = conditionalFilterType.checkbox;
        osObject.filterValues = {};

        // API call to systems endpoint
        this.fetchSystems({
            perPage: -1,
            orderBy: 'os',
            orderHow: SortByDirection.desc
        }).then((response) => {
            osObject.filterValues.items = Array.from(new Set((response.data).reduce((filtered, system) => {
                if (system.os) {
                    filtered.push(system.os);
                }

                return filtered;
            }, []))).map(os => {
                return { label: os, value: os.split(' ')[1] };
            });

            if (osObject.filterValues.items.length === 0) {
                osObject.filterValues.items = [{ label: 'No versions available' }];
                osObject.type = conditionalFilterType.group;
            }

            this.setState({
                OSFObject: osObject
            });
        });
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
        let params = {
            limit: fetchParams.perPage,
            ...fetchParams?.page && {
                offset: (fetchParams.page - 1) * fetchParams.perPage
            },
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
        fetchParams?.osFilter?.forEach((osFilterValue) => {
            query.append('os', osFilterValue);
        });
        fetchParams?.groupFilter?.forEach((groupFilterValue) => {
            query.append('group_name', groupFilterValue);
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

    updateOSFilter = (value) => {
        this.setState({
            osFilterValue: value
        });
    }

    onDeleteFilters = (e, filtersArr) => {
        const deletedStateFilters = filtersArr.filter((filterObject) => {
            return filterObject.category === 'State';
        });

        const deletedOSFilters = filtersArr.filter((filterObject) => {
            return filterObject.category === 'Operating System';
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

        if (deletedOSFilters.length > 0) {
            const resetFiltersList = deletedOSFilters[0]?.chips.map((chip) =>{
                return chip?.name;
            });
            const activeOSFilters = this.state.osFilterValue.filter(filterName => !resetFiltersList.includes(filterName));

            this.setState ({
                osFilterValue: activeOSFilters
            });
        }
    }

    getActiveFilterConfig = () => {
        const activeStateFilters = this.state.stateFilterValue.map((value)=> ({ name: value }));
        const activeOSFilters = this.state.osFilterValue.map((value)=> ({ name: value }));

        const activeFilters = [];
        if (activeStateFilters.length > 0) {
            activeFilters.push({
                category: 'State',
                chips: activeStateFilters
            });
        }

        if (activeOSFilters.length > 0) {
            activeFilters.push({
                category: 'Operating System',
                chips: activeOSFilters
            });
        }

        return activeFilters;
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
        const { stateFilterValue, nameFilterValue, osFilterValue, orderBy, orderDirection } = this.state;
        const filters = {
            stateFilter: stateFilterValue,
            hostnameOrId: nameFilterValue,
            osFilter: osFilterValue
        };

        const { addNotification, clearNotifications } = this.props;

        downloadReport(fileType, filters, orderBy, orderDirection,
            notification => addNotification(notification),
            () => clearNotifications());
    }

    renderConfigStepsOrTable() {
        const { state: SFObject } = CUSTOM_FILTERS;
        const activeColumns = this.getActiveColumns();
        const { exportSystemsPDF, stateFilterValue, nameFilterValue, osFilterValue, groupFilterValue,
            orderBy, orderDirection, disableExport, isColumnModalOpen,
            OSFObject } = this.state;

        const customFilterConfig = {
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
                },
                {
                    label: OSFObject.label,
                    type: OSFObject.type,
                    value: `checkbox-os`,
                    filterValues: {
                        items: OSFObject.filterValues?.items,
                        onChange: (_e, values) => this.updateOSFilter(values),
                        value: osFilterValue
                    }
                }
            ]
        };

        return (
            this.props.showConfigSteps
                ? <ServiceNotConfigured />
                : <React.Fragment>
                    <PageHeader className='ros-page-header'>
                        <PageHeaderTitle title='Resource Optimization'/>
                        <DownloadExecutivePDFReport isDisabled={this.state.disableExport} />
                    </PageHeader>

                    <Main>
                        <Card className='pf-t-light  pf-m-opaque-100'>
                            <CardBody>
                                <ManageColumnsModal
                                    isModalOpen={isColumnModalOpen}
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
                                    hideFilters={{ all: true, name: false, hostGroupFilter: false }}
                                    autoRefresh= {true}
                                    customFilters={{
                                        stateFilter: stateFilterValue,
                                        osFilter: osFilterValue
                                    }}
                                    columns={activeColumns}
                                    getEntities={async (_items, config) => {
                                        this.setState(() => ({
                                            orderBy: config.orderBy,
                                            orderDirection: config.orderDirection,
                                            nameFilterValue: config.filters?.hostnameOrId,
                                            groupFilterValue: config?.filters?.hostGroupFilter // the group filter is set by Inventory
                                        }));
                                        const results = await this.fetchSystems(
                                            {
                                                page: config.page, perPage: config.per_page,
                                                orderBy: this.sortingHeader[config.orderBy],
                                                orderHow: config.orderDirection,
                                                filters: config.filters,
                                                stateFilter: config.stateFilter,
                                                osFilter: config.osFilter,
                                                groupFilter: config?.filters?.hostGroupFilter // the group filter is set by Inventory
                                            }
                                        );

                                        const invIds = (results.data || []).map(({ inventory_id: inventoryId }) => inventoryId);
                                        const invSystems = await this.fetchInventoryDetails(invIds, {
                                            ...config,
                                            orderBy: undefined,
                                            orderDirection: undefined,
                                            page: PAGE,
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
                                        this.props.setSort(orderBy, orderDirection, 'CHANGE_SORT');
                                    }}
                                    expandable='true'
                                    filterConfig={customFilterConfig}
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
                                        isDisabled: disableExport,
                                        extraItems: [
                                            <li key='pdf-button-item' role='menuitem'>
                                                <Button
                                                    key='pdf-download-button'
                                                    variant='none'
                                                    className="pf-c-dropdown__menu-item"
                                                    onClick={() => this.setExportSystemsPDF(true)}>
                                                Export to PDF
                                                </Button>
                                            </li>
                                        ],
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
                                        hostnameOrId: nameFilterValue,
                                        osFilter: osFilterValue,
                                        groupFilter: groupFilterValue
                                    }}
                                    orderBy={orderBy}
                                    orderHow={orderDirection}
                                />
                                }
                            </CardBody>
                        </Card>
                    </Main>
                </React.Fragment>
        );
    }

    render() {
        return (
            <React.Fragment>
                <PermissionContext.Consumer>
                    { value =>
                        value.permissions.hasRead === false
                            ? <NotAuthorized serviceName={SERVICE_NAME} />
                            : this.renderConfigStepsOrTable()
                    }
                </PermissionContext.Consumer>
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
        changeSystemColumns: (payload) => dispatch(changeSystemColumns(payload)),
        addNotification: (payload) => dispatch(addNotification(payload)),
        clearNotifications: () => dispatch(clearNotifications())
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
    changeSystemColumns: PropTypes.func,
    addNotification: PropTypes.func,
    clearNotifications: PropTypes.func,
    chrome: PropTypes.object,
    groupsEnabled: PropTypes.bool
};

const RosPageWithChrome =  props => {
    const chrome = useChrome();
    const location = useLocation();
    const groupsEnabled = useFeatureFlag('hbi.ui.inventory-groups');

    return (
        <RosPage {...props} chrome={ chrome } groupsEnabled={ groupsEnabled } location={ location }/>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(RosPageWithChrome);
