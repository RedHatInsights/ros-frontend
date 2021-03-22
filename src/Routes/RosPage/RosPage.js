import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components/PageHeader';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import { Card, CardBody } from '@patternfly/react-core';
import './ros-page.scss';
import '../../Components/RosTable/RosTable.scss';
import { ProgressScoreBar } from '../../Components/RosTable/ProgressScoreBar';
import { connect } from 'react-redux';
import { systemsTableActions } from '../../Components/RosTable/redux';
import { InventoryTable } from '@redhat-cloud-services/frontend-components/Inventory';
import { register } from '../../store';
import { entityDetailReducer } from '../../Components/RosTable/redux/entityDetailReducer';
import { ROS_API_ROOT, SYSTEMS_API_ROOT } from '../../constants';
import { SortByDirection } from '@patternfly/react-table';
export const systemName = (displayName, id) => {
    return (
        <a href={ `${ROS_API_ROOT}${SYSTEMS_API_ROOT}/${id}` }
            className={ `pf-link system-link link-${id}` }>{displayName}</a>
    );
};

export const scoreProgress = (data) => {
    return (
        <ProgressScoreBar measureLocation='outside' valueScore={data} />
    );
};

export const recommendations = (data, id) => {
    let applyClasses = 'recommendations';
    if (data === 0) {
        applyClasses += ' green-400';
    }

    return (
        <a href='#'
            className={ `pf-link ${applyClasses} link-${id}` }>{data}</a>
    );
};

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
                { key: 'display_performance_score.cpu_score', title: 'CPU score', renderFunc: scoreProgress },
                { key: 'display_performance_score.memory_score', title: 'Memory score', renderFunc: scoreProgress },
                { key: 'display_performance_score.io_score', title: 'I/O score', renderFunc: scoreProgress },
                { key: 'recommendation_count', title: 'Recommendations',
                    renderFunc: recommendations, props: { isStatic: true } },
                { key: 'state', title: 'State', props: { isStatic: true } }
            ]
        };

        this.inventory = React.createRef();
        this.fetchSystems = this.fetchSystems.bind(this);
    }

    fetchSystems(fetchParams) {
        let params = {};
        params.limit = fetchParams.perPage;
        params.offset = (fetchParams.page - 1) * fetchParams.perPage;
        params.order_by = fetchParams.orderBy || this.state.orderBy; /* eslint-disable-line camelcase */
        params.order_how = fetchParams.orderHow || this.state.orderDirection; /* eslint-disable-line camelcase */

        let url = new URL(ROS_API_ROOT + SYSTEMS_API_ROOT,  window.location.origin);
        url.search = new URLSearchParams(params).toString();
        return fetch(url).then((res) => {
            if (!res.ok) {
                throw Error(res.statusText);
            }

            return res;
        }).then(res =>  res.json());
    }

    render() {

        const sortingHeader = { display_name: 'display_name', /* eslint-disable-line camelcase */
            'display_performance_score.cpu_score': 'cpu_score',
            'display_performance_score.memory_score': 'memory_score',
            'display_performance_score.io_score': 'io_score',
            recommendation_count: 'recommendation_count', /* eslint-disable-line camelcase */
            state: 'state' };

        return (
            <React.Fragment>
                <PageHeader>
                    <PageHeaderTitle title='Resource Optimization'/>
                </PageHeader>
                <Main>
                    <Card className='pf-t-light  pf-m-opaque-100'>
                        <CardBody>
                            <InventoryTable
                                ref={this.inventory}
                                hasCheckbox={ false }
                                tableProps={{
                                    canSelectAll: false
                                }}
                                variant="compact"
                                hideFilters={{ all: true }}
                                getEntities={async (_items, config) => {
                                    this.setState(() => ({
                                        orderBy: config.orderBy,
                                        orderDirection: config.orderDirection
                                    }));
                                    const results = await this.fetchSystems(
                                        { page: config.page, perPage: config.per_page,
                                            orderBy: sortingHeader[config.orderBy], orderHow: config.orderDirection
                                        }
                                    );

                                    const data = await this.state.getEntities?.(
                                        (results.data || []).map(({ inventory_id: inventoryId }) => inventoryId),
                                        {
                                            ...config,
                                            page: 1,
                                            hasItems: true
                                        },
                                        false
                                    );

                                    return {
                                        results: results.data.map((system) => ({
                                            ...data.results.find(({ id }) => id === system.inventory_id),
                                            ...system
                                        })),
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
                                            entityDetailReducer(
                                                INVENTORY_ACTION_TYPES, this.state.columns
                                            )
                                        )
                                    });
                                    this.props.setSort(this.state.orderBy, this.state.orderDirection, 'CHANGE_SORT');
                                }}
                                expandable='true'
                                onExpandClick={(_e, _i, isOpen, { id }) => this.props.expandRow(id, isOpen)}
                            >
                            </InventoryTable>
                        </CardBody>
                    </Card>
                </Main>
            </React.Fragment>
        );
    };
};

function mapDispatchToProps(dispatch) {
    return {
        expandRow: (id, isOpen) => dispatch(systemsTableActions.expandRow(id, isOpen)),
        setSort: (orderByKey, orderByDirection, actionType) => dispatch({
            type: actionType,
            payload: {
                key: orderByKey,
                direction: orderByDirection
            }
        })
    };
}

RosPage.propTypes = {
    expandRow: PropTypes.func,
    setSort: PropTypes.func
};

export default withRouter(connect(null, mapDispatchToProps)(RosPage));
