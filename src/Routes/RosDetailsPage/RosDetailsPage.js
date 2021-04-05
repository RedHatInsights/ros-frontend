import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { Grid, GridItem, Breadcrumb, BreadcrumbItem } from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import { PageHeader } from '@redhat-cloud-services/frontend-components/PageHeader';
import { InventoryDetailHead, AppInfo, DetailWrapper } from '@redhat-cloud-services/frontend-components/Inventory';
import { register } from '../../store';
import { entityDetailReducer } from '../../store/entityDetailReducer';
// import { fetchRosSystemDetailsAction } from '../../store/Actions/Actions';
import './ros-details-page.scss';
import { ExpandedRow } from '../../Components/RosTable/ExpandedRow';
import { ROS_API_ROOT, SYSTEMS_API_ROOT } from '../../constants';
import RecommendationRating from '../../Components/RecommendationRating/RecommendationRating';

class RosDetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inventoryId: this.props.match.params.inventoryId
        };
    }

    async componentDidMount() {
        insights.chrome?.hideGlobalFilter?.(true);
        insights.chrome.appAction('system-detail');
        await window.insights.chrome.auth.getUser();
        await this.fetchRosSystemDetails();
    }

    async fetchRosSystemDetails() {
        let url = new URL(ROS_API_ROOT + SYSTEMS_API_ROOT + `/${this.state.inventoryId}`,  window.location.origin);
        const response = await fetch(url).then((res) => {
            if (!res.ok) {
                throw Error(res.statusText);
            }

            return res;
        }).then(res => res.json());
        this.setState({ rosSystemDetail: response });
    }

    renderChildrenNode() {
        if (this.state.rosSystemDetail) {
            const {
                cloud_provider: cloudProvider,
                instance_type: instanceType,
                idling_time: idlingTime, io_wait: ioWait,
                rating,
                // FIXME: use inventory_id once backend PR merged
                host_id: inventoryId
            } = this.state.rosSystemDetail;
            return (
                <Grid className='ros-system-info'>
                    <GridItem>
                        <ExpandedRow
                            { ...{ cloudProvider, instanceType, idlingTime, ioWait } }
                            inventoryId={ this.state.inventoryId }
                        />
                    </GridItem>
                    <GridItem>
                        <RecommendationRating system={ { ...{ rating, inventoryId } } } />
                    </GridItem>
                </Grid>
            );
        } else {
            return null;
        }
    }

    render() {
        const entity = this.props.entity;
        return (
            <React.Fragment>
                <DetailWrapper
                    hideInvLink
                    onLoad={({ mergeWithDetail, INVENTORY_ACTION_TYPES }) => {
                        register(mergeWithDetail(
                            entityDetailReducer(INVENTORY_ACTION_TYPES, this.state.rosSystemDetail)
                        ));
                    }}
                    className='rosDetailWrapper'
                >
                    <PageHeader>
                        <Breadcrumb ouiaId="system-detail">
                            <BreadcrumbItem>
                                <Link to='/'>Resource Optimization</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem isActive>
                                <div className="ins-c-inventory__detail--breadcrumb-name">
                                    { entity ? entity.display_name : null }
                                </div>
                            </BreadcrumbItem>
                        </Breadcrumb>
                        <InventoryDetailHead
                            hideBack
                            hideInvLink
                            showDelete={ false }
                            hideInvDrawer
                        />
                        { this.renderChildrenNode() }
                    </PageHeader>
                    <Main>
                        <Grid gutter="md">
                            <GridItem span={12}>
                                <AppInfo showTags fallback="" />
                            </GridItem>
                        </Grid>
                    </Main>
                </DetailWrapper>
            </React.Fragment>
        );
    }
};

RosDetailsPage.propTypes = {
    match: PropTypes.any,
    entity: PropTypes.object
    //fetchRosSystemDetails: PropTypes.func
};

const mapStateToProps = (state, props) => {
    return {
        entity: state.entityDetails && state.entityDetails.entity,
        ...props
    };
};

/*function mapDispatchToProps(dispatch) {
    return {
        fetchRosSystemDetails: (params = {}) => dispatch(fetchRosSystemDetailsAction(params))
    };
}*/

export default withRouter(connect(mapStateToProps, null)(RosDetailsPage));
