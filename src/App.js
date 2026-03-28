import React, { createContext, useEffect } from 'react';
import { ROSRoutes } from './Routes';
import './App.scss';
import NotificationsProvider from '@redhat-cloud-services/frontend-components-notifications/NotificationsProvider';
import { systemRecsReducer, systemDetailReducer, isConfiguredReducer, systemColumnsReducer, suggestedInstanceTypesReducer } from './store/reducers';
import { register } from './store';
import { useChrome } from '@redhat-cloud-services/frontend-components/useChrome';
import { useKesselPermissions } from './Utilities/hooks/useKesselPermissions';
import { useV1Permissions } from './Utilities/hooks/useV1Permissions';
import useFeatureFlag from './Utilities/useFeatureFlag';

export const PermissionContext = createContext();

/**
 * @see https://github.com/project-kessel/kessel-sdk-browser/tree/master/packages/react-kessel-access-check#useselfaccesscheck
 * @see https://github.com/RedHatInsights/rbac-config/blob/master/configs/stage/schemas/src/ros.ksl
 */
const App = () => {
    const chrome = useChrome();
    const isKesselEnabled = useFeatureFlag('ros-frontend.kessel-enabled');

    const kesselPermissions = useKesselPermissions(['ros:analysis:read']);
    const v1Permissions = useV1Permissions(chrome, !isKesselEnabled);

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

    if (isLoading) {
        return null;
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
