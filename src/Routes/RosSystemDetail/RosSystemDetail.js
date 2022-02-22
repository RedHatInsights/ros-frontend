import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, GridItem, Breadcrumb, BreadcrumbItem } from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import { PageHeader } from '@redhat-cloud-services/frontend-components/PageHeader';
import { InventoryDetailHead, AppInfo, DetailWrapper } from '@redhat-cloud-services/frontend-components/Inventory';
import { register } from '../../store';
import { loadSystemInfo } from '../../store/actions';
import { entityDetailReducer } from '../../store/entityDetailReducer';
import './ros-details-page.scss';
import { ExpandedRow } from '../../Components/RosTable/ExpandedRow';
import RecommendationRating from '../../Components/RecommendationRating/RecommendationRating';
import { SystemState } from '../../Components/RosTable/SystemState';
import { NotAuthorized } from '@redhat-cloud-services/frontend-components/NotAuthorized';
import { PermissionContext } from '../../App';
import {
    DescriptionList,
    DescriptionListTerm,
    DescriptionListGroup,
    DescriptionListDescription
} from '@patternfly/react-core';

class RosSystemDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inventoryId: this.props.match.params.inventoryId
        };
    }

    async componentDidMount() {
        insights.chrome?.hideGlobalFilter?.(true);
        insights.chrome.appAction('system-detail');
        await this.props.loadSystemInfo(this.state.inventoryId);
        document.title = this.props.rosSystemInfo.display_name;
    }

    renderChildrenNode() {
        if (this.props.rosSystemInfo) {
            const {
                cloud_provider: cloudProvider,
                instance_type: instanceType,
                idling_time: idlingTime,
                rating,
                state: state
            } = this.props.rosSystemInfo;
            const { inventoryId } = this.props.match.params;
            return (
                <Grid className='ros-system-info'>
                    <DescriptionList className='expanded-row' isCompact isHorizontal>
                        <DescriptionListGroup>
                            <DescriptionListTerm>State</DescriptionListTerm>
                            <DescriptionListDescription>
                                <SystemState stateValue={ state }/>
                            </DescriptionListDescription>
                        </DescriptionListGroup>
                    </DescriptionList>
                    <GridItem>
                        <ExpandedRow
                            { ...{ cloudProvider, instanceType, idlingTime, inventoryId } }
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
                <PermissionContext.Consumer>
                    { value =>
                        value.permissions.systemsRead === false
                            ? <NotAuthorized serviceName='Resource Optimization'/>
                            : <DetailWrapper
                                onLoad={({ mergeWithDetail, INVENTORY_ACTION_TYPES }) => {
                                    register(mergeWithDetail(
                                        entityDetailReducer(INVENTORY_ACTION_TYPES)
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
                    }
                </PermissionContext.Consumer>
            </React.Fragment>
        );
    }
};

RosSystemDetail.propTypes = {
    match: PropTypes.any,
    entity: PropTypes.object,
    loading: PropTypes.bool,
    rosSystemInfo: PropTypes.object,
    loadSystemInfo: PropTypes.func
};

const mapStateToProps = (state, props) => {
    return {
        entity: state.entityDetails && state.entityDetails.entity,
        loading: state.systemDetailReducer?.loading,
        rosSystemInfo: state.systemDetailReducer?.systemInfo,
        ...props
    };
};

function mapDispatchToProps(dispatch) {
    return {
        loadSystemInfo: (uuid) => dispatch(loadSystemInfo(uuid))
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps)(RosSystemDetail)
);
