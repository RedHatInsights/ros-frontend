import React, { Fragment, useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { PageHeader } from '@redhat-cloud-services/frontend-components/PageHeader';
import { Breadcrumb, BreadcrumbItem } from '@patternfly/react-core';
//import { fetchRosDetails } from '../../Components/RosTable/redux/actions';
//import { useSelector } from 'react-redux';

import { InventoryDetailHead, DetailWrapper } from '@redhat-cloud-services/frontend-components/Inventory';
import { register } from '../../store/index';

const RosDetailsPage = () => {
    const { inventoryId } = useParams();
    //const displayName = useSelector(
    //    ({ entityDetails }) => entityDetails?.entity?.display_name
    //);
    // do we need a Reducer similar to groupsDetailReducer for entity ?
    // how do we get display_name/uuid of system ?

    useEffect(() => {
        insights.chrome?.hideGlobalFilter?.(true);
        insights.chrome.appAction('system-detail');
    }, []);

    useEffect(() => {
        insights?.chrome?.appObjectId?.(inventoryId);
    }, [inventoryId]);

    return (
        <Fragment>
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
                        <BreadcrumbItem to='/insights/ros'>Resource Optimization</BreadcrumbItem>
                        <BreadcrumbItem>System1</BreadcrumbItem>
                    </Breadcrumb>
                    <InventoryDetailHead fallback="" hideBack showTags hideInvDrawer />
                </PageHeader>
            </DetailWrapper>
        </Fragment>
    );

};

export default withRouter(RosDetailsPage);
