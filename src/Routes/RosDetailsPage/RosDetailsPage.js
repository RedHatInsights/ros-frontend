import React, { useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PageHeader } from '@redhat-cloud-services/frontend-components/PageHeader';
import { Breadcrumb, BreadcrumbItem } from '@patternfly/react-core';
//import { fetchRosDetails } from '../../Components/RosTable/redux/actions';
import { routes as paths } from '../../../package.json';

import { InventoryDetailHead, AppInfo, DetailWrapper } from '@redhat-cloud-services/frontend-components/Inventory';
import { useSelector } from 'react-redux';

const RosDetail = () => {
    const { inventoryId } = useParams();
    const displayName = useSelector(
        ({ entityDetails }) => entityDetails?.entity?.display_name
    );
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
            //onLoad={({ mergeWithDetail }) => {
            //  register({

            //     });
            //}}
        >
            <PageHeader>
                <Breadcrumb>
                    <BreadcrumbItem to="#">Resource Optimization</BreadcrumbItem>
                    <BreadcrumbItem to={paths.rosDetails}>System1</BreadcrumbItem>
                </Breadcrumb>
                <InventoryDetailHead fallback="" hideBack showTags hideInvDrawer />
            </PageHeader>
        </DetailWrapper>
    );
};

RosDetail.propTypes = {
    loaded: PropTypes.bool.isRequired,
    entity: PropTypes.object
};

export default withRouter(RosDetail);
