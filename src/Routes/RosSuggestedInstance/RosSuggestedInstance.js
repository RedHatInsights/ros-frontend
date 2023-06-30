import React, { useContext, useEffect } from 'react';
import { PermissionContext } from '../../App';
import { useChrome } from '@redhat-cloud-services/frontend-components/useChrome';
import { NotAuthorized } from '@redhat-cloud-services/frontend-components/NotAuthorized';
import {
    EmptyStateBody,
    EmptyState,
    EmptyStateVariant,
    Title
} from '@patternfly/react-core';
import { SERVICE_NAME } from '../../constants';

export default function RosSuggestedInstance() {
    const hasPermissions = useContext(PermissionContext).permissions.hasRead;
    const { hideGlobalFilter, updateDocumentTitle } = useChrome();

    useEffect(() => {
        updateDocumentTitle('Suggested Instance Types - Resource Optimization | Red Hat Insights');
        hideGlobalFilter();
    }, []);

    return (
        hasPermissions
            ? <NoEntities />
            : <NotAuthorized serviceName={SERVICE_NAME} />
    );
}

// TODO: remove or update this component when working on RHIROS-1166
const NoEntities = () => (
    <EmptyState variant={EmptyStateVariant.full}>
        <Title headingLevel="h5" size="lg">
          Suggested Instance Types Table
        </Title>
        <EmptyStateBody>
            No records found
        </EmptyStateBody>
    </EmptyState>
);
