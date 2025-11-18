import React, { useContext, useEffect } from 'react';
import { PermissionContext } from '../../App';
import { useChrome } from '@redhat-cloud-services/frontend-components/useChrome';
import { NotAuthorized } from '@redhat-cloud-services/frontend-components/NotAuthorized';
import ErrorState from '@redhat-cloud-services/frontend-components/ErrorState';
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
import SuggestedInstanceTypesTable from  '../../Components/InstanceTypes/SuggestedInstanceTypesTable';

const SuggestedInstance = () => {
    const dispatch = useDispatch();
    const { loading, showConfigSteps, systemWithSuggestions, serverError } = useSelector((state) => state.isConfiguredReducer);
    const hasSuggestedInstances = systemWithSuggestions !== 0;

    useEffect(() => {
        dispatch(loadIsConfiguredInfo());
    }, [dispatch]);

    return (
        showConfigSteps
            ? <ServiceNotConfigured />
            : (
                <>
                    <PageHeader>
                        <PageHeaderTitle title='Suggested Instance Types'/>
                    </PageHeader>
                    {
                        serverError.message ?
                            <ErrorState/> :
                            !loading ?
                                (
                                    hasSuggestedInstances
                                        ? <SuggestedInstanceTypesTable />
                                        : <NoEntitiesFound />
                                ) : (
                                    <Bullseye>
                                        <Spinner />
                                    </Bullseye>
                                )

                    }
                </>
            )
    );
};

export default function RosSuggestedInstanceTypes() {
    const hasPermissions = useContext(PermissionContext).permissions.hasRead;
    const { hideGlobalFilter, updateDocumentTitle } = useChrome();

    useEffect(() => {
        updateDocumentTitle('Suggested Instance Types - Resource Optimization - Business ');
        hideGlobalFilter();
    }, [updateDocumentTitle, hideGlobalFilter]);

    return (
        hasPermissions
            ? <SuggestedInstance />
            : <NotAuthorized serviceName={SERVICE_NAME} />
    );
}

