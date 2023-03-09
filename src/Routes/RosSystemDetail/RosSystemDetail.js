import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, GridItem, Breadcrumb, BreadcrumbItem, Spinner } from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import { PageHeader } from '@redhat-cloud-services/frontend-components/PageHeader';
import { InventoryDetailHead, DetailWrapper } from '@redhat-cloud-services/frontend-components/Inventory';
import { register } from '../../store';
import { loadSystemInfo } from '../../store/actions';
import { entityDetailReducer } from '../../store/entityDetailReducer';
import './ros-details-page.scss';
import { ExpandedRow } from '../../Components/RosTable/ExpandedRow';
import RecommendationRating from '../../Components/RecommendationRating/RecommendationRating';
import { SystemState } from '../../Components/RosTable/SystemState';
import { NotAuthorized } from '@redhat-cloud-services/frontend-components/NotAuthorized';
import { PermissionContext } from '../../App';
import { displayLastReported } from '../../Components/RosTable/RenderColumn';
import {
    Flex,
    FlexItem,
    Stack,
    StackItem,
    DescriptionList,
    DescriptionListTerm,
    DescriptionListGroup,
    DescriptionListDescription
} from '@patternfly/react-core';
import { HistoricalDataChart } from '../../Components/HistoricalDataChart/HistoricalDataChart';
import SystemDetailWrapper from '../../Components/SystemDetail/SystemDetail';

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
                report_date: reportDate,
                rating,
                state
            } = this.props.rosSystemInfo;
            const { inventoryId } = this.props.match.params;
            return (

                <Flex alignItems={{ default: 'alignItemsCenter' }}>
                    <Flex grow={{ default: 'grow' }} className='ros-system-info'>
                        <Flex flex={{ default: 'flex_4' }} direction={{ default: 'column' }}>
                            <FlexItem>
                                <DescriptionList className='expanded-row' isCompact isHorizontal>
                                    <DescriptionListGroup>
                                        <DescriptionListTerm>Last reported</DescriptionListTerm>
                                        <DescriptionListDescription>
                                            { displayLastReported(reportDate) }
                                        </DescriptionListDescription>
                                    </DescriptionListGroup>
                                    <DescriptionListGroup>
                                        <DescriptionListTerm>State</DescriptionListTerm>
                                        <DescriptionListDescription>
                                            <SystemState stateValue={ state }/>
                                        </DescriptionListDescription>
                                    </DescriptionListGroup>
                                </DescriptionList>
                                <ExpandedRow
                                    { ...{ cloudProvider, instanceType, idlingTime, inventoryId } }
                                />
                                <RecommendationRating system={{ rating, inventoryId }} />
                            </FlexItem>
                        </Flex>
                        <Flex grow={{ default: 'grow' }} direction={{ default: 'column' }} >
                            <HistoricalDataChart inventoryId={inventoryId}/>
                        </Flex>
                    </Flex>
                </Flex>
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
                                inventoryId={this.state.inventoryId}
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

                                    <Stack hasGutter>
                                        <StackItem>
                                            <InventoryDetailHead
                                                hideBack
                                                showDelete={ false }
                                                hideInvDrawer
                                                className='rosDetailsHead'
                                            />
                                        </StackItem>
                                        <StackItem isFilled>{ this.renderChildrenNode() }</StackItem>
                                    </Stack>
                                </PageHeader>
                                <Main>
                                    <Grid gutter="md">
                                        <GridItem span={12}>
                                            { entity ? <SystemDetailWrapper showTags fallback=""/> : <Spinner/>}
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
