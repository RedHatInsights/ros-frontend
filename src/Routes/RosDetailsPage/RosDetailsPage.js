import React, { useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { PageHeader } from '@redhat-cloud-services/frontend-components/PageHeader';
import { Breadcrumb, BreadcrumbItem } from '@patternfly/react-core';
//import { fetchRosDetails } from '../../Components/RosTable/redux/actions';
import { routes as paths } from '../../../package.json';

import { InventoryDetailHead, AppInfo, DetailWrapper } from '@redhat-cloud-services/frontend-components/Inventory';
import { register } from '../../store/index';
//import { useSelector } from 'react-redux';

const RosDetailsPage = () => {
    const { inventoryId } = useParams();
    //const displayName = useSelector(
    //    ({ entityDetails }) => entityDetails?.entity?.display_name
    //);
    // do we need a Reducer similar to groupsDetailReducer for entity ?

    useEffect(() => {
        insights.chrome?.hideGlobalFilter?.(true);
        insights.chrome.appAction('system-detail');
    }, []);

    useEffect(() => {
        insights?.chrome?.appObjectId?.(inventoryId);
    }, [inventoryId]);

    return (
        <DetailWrapper
            hideInvLink
            showTags
            onLoad={({ mergeWithDetail }) => {
                register({ ...mergeWithDetail()
                });
            }}
        >
            <PageHeader>
                <Breadcrumb>
                    <BreadcrumbItem to={paths.rosPage}>Resource Optimization</BreadcrumbItem>
                    <BreadcrumbItem to={paths.rosDetailsPage}>System1</BreadcrumbItem>
                </Breadcrumb>
                <InventoryDetailHead fallback="" hideBack showTags hideInvDrawer />
            </PageHeader>
        </DetailWrapper>
    );
};

export default withRouter(RosDetailsPage);
