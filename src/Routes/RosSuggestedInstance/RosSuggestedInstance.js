import React, { useContext, useEffect } from 'react';
import { PermissionContext } from '../../App';
import { useChrome } from '@redhat-cloud-services/frontend-components/useChrome';
import { NotAuthorized } from '@redhat-cloud-services/frontend-components/NotAuthorized';
import {
    Spinner,
    Bullseye
} from '@patternfly/react-core';
import { SERVICE_NAME } from '../../constants';
import {
    PageHeader,
    PageHeaderTitle
} from '@redhat-cloud-services/frontend-components/PageHeader';
import { useSelector, useDispatch } from 'react-redux';
import { ServiceNotConfigured } from '../../Components/ServiceNotConfigured/ServiceNotConfigured';
import { loadIsConfiguredInfo } from '../../store/actions';
import NoEntitiesFound from '../../Components/NoEntitiesFound/NoEntitiesFound';

const SuggestedInstance = () => {
    const dispatch = useDispatch();
    const { showConfigSteps, systemCount } = useSelector((state) => state.isConfiguredReducer);
    const hasSuggestedInstances = false;
    useEffect(() => {
        dispatch(loadIsConfiguredInfo());
    }, []);

    return (
        showConfigSteps
            ? <ServiceNotConfigured />
            : (
                <>
                    <PageHeader>
                        <PageHeaderTitle title='Suggested Instance Types'/>
                    </PageHeader>
                    {
                        hasSuggestedInstances   //TODO: remove or update this check when working on RHIROS-1163
                            ? <div>Suggested instance table</div>
                            : systemCount !== 0
                                ? <NoEntitiesFound />
                                : (
                                    <Bullseye>
                                        <Spinner />
                                    </Bullseye>
                                )
                    }
                </>
            )
    );
};

export default function RosSuggestedInstance() {
    const hasPermissions = useContext(PermissionContext).permissions.hasRead;
    const { hideGlobalFilter, updateDocumentTitle } = useChrome();

    useEffect(() => {
        updateDocumentTitle('Suggested Instance Types - Resource Optimization | Red Hat Insights');
        hideGlobalFilter();
    }, []);

    return (
        hasPermissions
            ? <SuggestedInstance />
            : <NotAuthorized serviceName={SERVICE_NAME} />
    );
}

