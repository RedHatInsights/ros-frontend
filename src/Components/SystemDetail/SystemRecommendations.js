import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PrimaryToolbar } from '@redhat-cloud-services/frontend-components/PrimaryToolbar';
import { TableToolbar } from '@redhat-cloud-services/frontend-components/TableToolbar';
import { ServiceNotConfigured } from '../ServiceNotConfigured/ServiceNotConfigured';
import { loadSysRecs } from '../../store/actions';
import {
    Card,
    CardBody,
    Title,
    Stack,
    StackItem,
    Pagination
} from '@patternfly/react-core';
import debounce from 'lodash/debounce';
const RecommendationsTable = React.lazy(() => import('./RecommendationsTable'));
/**
 * This is a dumb component that only recieves properties from a smart component.
 * Dumb components are usually functions and not classes.
 *
 * @param props the props given by the smart component.
 */
const defaultFilters = {
    name: {
        label: 'Name',
        value: ''
    }
};

export const isEmptyFilters = (activeFilters) => Object.values(activeFilters).find(
    (item) => item?.value?.length > 0 || item?.length > 0
);

export const constructActiveFilters = (activeFilters) => Object.entries(activeFilters).map(([key, { label, value } = {}]) => ({
    category: label,
    chipKey: key,
    chips:
        value?.length > 0
            ? Array.isArray(value)
                ? value.map((item) => ({ name: item })) : [{ name: value }]
            : []
}));

export const onDeleteFilter = (activeFilters, itemsToRemove) => {
    const currItem = itemsToRemove[0];
    return {
        ...activeFilters,
        [currItem?.chipKey]: {
            ...(activeFilters[currItem?.chipKey] || {}),
            value: Array.isArray(activeFilters[currItem?.chipKey]?.value)
                ? activeFilters[currItem?.chipKey]?.value?.filter(
                    (item) => !currItem?.chips?.find(({ name }) => name === item)
                  )
                : ''
        }
    };
};

class SystemRecommendations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            perPage: 10,
            inventoryId: props.inventoryId,
            activeFilters: defaultFilters
        };
        // Note that 800 is used widely accross platform
        this.debouncedThrottleHandleChange = debounce(
            this.throttleHandleChange.bind(this), 800
        );

    }

    async componentDidMount() {
        await this.requestLoadSysRecs();
    }

    async throttleHandleChange(options) {
        await this.requestLoadSysRecs(options);
    }

    async requestLoadSysRecs(options = {}) {
        const params = {
            page: this.state.page,
            perPage: this.state.perPage,
            description: this.state?.descriptionFilter,
            ...options
        };
        await this.props.loadSysRecs(this.state.inventoryId, params);
    }

    applyFilters(filters) {
        this.setState({
            activeFilters: filters,
            descriptionFilter: filters?.name?.value,
            page: 1
        });
        this.debouncedThrottleHandleChange({
            description: filters?.name?.value,
            page: 1
        });
    }

    async updatePagination(pagination) {
        this.setState(pagination);
        await this.requestLoadSysRecs(pagination);
    }

    render() {
        const { totalRecs, recsData, emptyState  } = this.props;
        const { page, perPage } = this.state;
        return (
            emptyState ? <ServiceNotConfigured/> : (
                <Suspense fallback="">
                    <Stack hasGutter>
                        <StackItem>
                            <Title headingLevel="h3" size="2xl">
                                Suggestions
                            </Title>
                        </StackItem>
                        <StackItem>
                            <Card>
                                <CardBody>
                                    <PrimaryToolbar className="ros-primary-toolbar" pagination={{
                                        page: (totalRecs === 0 ? 0 : page),
                                        perPage,
                                        itemCount: (totalRecs ? totalRecs : 0),
                                        onSetPage: (_e, page) => this.updatePagination({ page, perPage: this.state.perPage }),
                                        onPerPageSelect: (_e, perPage) => this.updatePagination({ page: 1, perPage }),
                                        isCompact: true,
                                        widgetId: 'ros-pagination-top'
                                    }}
                                    filterConfig={{
                                        items: [{
                                            label: defaultFilters.name.label,
                                            type: 'text',
                                            filterValues: {
                                                key: 'text-filter',
                                                onChange: (event, value) => {
                                                    const activeFilters = {
                                                        ...this.state.activeFilters,
                                                        name: {
                                                            ...(this.state.activeFilters?.name || {}),
                                                            value
                                                        }
                                                    };
                                                    this.applyFilters(activeFilters);
                                                },
                                                value: this.state.activeFilters?.name?.value || '',
                                                placeholder: 'Filter by name'
                                            }
                                        }]
                                    }}
                                    activeFiltersConfig={{
                                        filters: isEmptyFilters(this.state.activeFilters)
                                            ? constructActiveFilters(this.state.activeFilters)
                                            : [],
                                        onDelete: (event, itemsToRemove, isAll) => {
                                            if (isAll) {
                                                this.applyFilters(defaultFilters);
                                            } else {
                                                const filtersOnDeletion = onDeleteFilter(this.state.activeFilters, itemsToRemove);
                                                this.applyFilters(filtersOnDeletion);
                                            }
                                        }
                                    }}
                                    />
                                    { (!this.props.loading) ? (<RecommendationsTable recommendations = { recsData }/>) : null }
                                    <TableToolbar>
                                        <Pagination
                                            itemCount={ totalRecs ? totalRecs : 0 }
                                            widgetId='ros-pagination-bottom'
                                            page={ totalRecs === 0 ? 0 : page }
                                            perPage={ perPage }
                                            variant='bottom'
                                            onSetPage={(_e, page) => this.updatePagination({ page, perPage: this.state.perPage })}
                                            onPerPageSelect={(_e, perPage) => this.updatePagination({ page: 1, perPage })}
                                        />
                                    </TableToolbar>
                                </CardBody>
                            </Card>
                        </StackItem>
                    </Stack>
                </Suspense>
            )
        );
    }
}

SystemRecommendations.propTypes = {
    inventoryId: PropTypes.string,
    loading: PropTypes.bool,
    recsData: PropTypes.array,
    totalRecs: PropTypes.number,
    loadSysRecs: PropTypes.func,
    emptyState: PropTypes.bool
};

const mapStateToProps = (state, props) => {
    return {
        loading: state.systemRecsReducer?.loading,
        recsData: state.systemRecsReducer?.recommendationsData,
        totalRecs: state.systemRecsReducer?.totalRecommendations,
        emptyState: state.systemRecsReducer?.emptyState,
        ...props
    };
};

function mapDispatchToProps(dispatch) {
    return {
        loadSysRecs: (uuid, params = {}) => dispatch(loadSysRecs(uuid, params))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SystemRecommendations);
