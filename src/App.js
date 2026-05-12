import React, { createContext, useEffect } from 'react';
import { ROSRoutes } from './Routes';
import './App.scss';
import NotificationsProvider from '@redhat-cloud-services/frontend-components-notifications/NotificationsProvider';
import { systemRecsReducer, systemDetailReducer, isConfiguredReducer, systemColumnsReducer, suggestedInstanceTypesReducer } from './store/reducers';
import { register } from './store';
import { Bullseye, Spinner } from '@patternfly/react-core';
import { useChrome } from '@redhat-cloud-services/frontend-components/useChrome';
import { useKesselPermissions } from './Utilities/hooks/useKesselPermissions';
import { useV1Permissions } from './Utilities/hooks/useV1Permissions';
import useFeatureFlag from './Utilities/useFeatureFlag';
import { useFlagsStatus } from '@unleash/proxy-client-react';

export const PermissionContext = createContext();

const REQUIRED_PERMISSIONS = ['ros:analysis:read'];

/**
 * @see https://github.com/project-kessel/kessel-sdk-browser/tree/master/packages/react-kessel-access-check#useselfaccesscheck
 * @see https://github.com/RedHatInsights/rbac-config/blob/master/configs/stage/schemas/src/ros.ksl
 */
const App = () => {
    const chrome = useChrome();
    const isKesselEnabled = useFeatureFlag('ros-frontend.kessel-enabled');
    const { flagsReady } = useFlagsStatus();

    const kesselPermissions = useKesselPermissions(REQUIRED_PERMISSIONS, isKesselEnabled && flagsReady);
    const v1Permissions = useV1Permissions(chrome, !isKesselEnabled && flagsReady);

    const { hasAccess, isLoading } = isKesselEnabled ? kesselPermissions : v1Permissions;

    useEffect(() => {
        register({
            systemDetailReducer,
            systemRecsReducer,
            isConfiguredReducer,
            systemColumnsReducer,
            suggestedInstanceTypesReducer
        });
        chrome?.updateDocumentTitle('Resource Optimization - Business');
    }, [chrome]);

    if (isLoading || !flagsReady) {
        return <Bullseye><Spinner size="xl" /></Bullseye>;
    }

    return (
        <PermissionContext.Provider
            value={{
                permissions: {
                    hasRead: hasAccess
                }
            }}>
            <NotificationsProvider>
                <ROSRoutes />
            </NotificationsProvider>
        </PermissionContext.Provider>
    );
};

export default App;
