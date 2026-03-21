import React, { createContext, useState, useEffect } from 'react';
import { ROSRoutes } from './Routes';
import './App.scss';
import NotificationsProvider from '@redhat-cloud-services/frontend-components-notifications/NotificationsProvider';
import { systemRecsReducer, systemDetailReducer, isConfiguredReducer, systemColumnsReducer, suggestedInstanceTypesReducer } from './store/reducers';
import { register } from './store';
import { useChrome } from '@redhat-cloud-services/frontend-components/useChrome';
import { useKesselPermissions } from './Utilities/hooks/useKesselPermissions';
import useFeatureFlag from './Utilities/useFeatureFlag';

export const PermissionContext = createContext();

/**
 * v1 permission check — uses chrome.getUserPermissions (legacy RBAC).
 * Skips the fetch when disabled (i.e. when Kessel is active).
 */
const useV1Permissions = (chrome, enabled) => {
    const [hasAccess, setHasAccess] = useState(false);
    const [isLoading, setIsLoading] = useState(enabled);

    useEffect(() => {
        if (!enabled) {
            return;
        }

        (async () => {
            const rosPermissions = await chrome.getUserPermissions('ros', true);
            const hasRead = rosPermissions.some(({ permission }) =>
                ['ros:*:*', 'ros:*:read'].includes(permission)
            );
            setHasAccess(hasRead);
            setIsLoading(false);
        })();
    }, [chrome, enabled]);

    return { hasAccess, isLoading };
};

/**
 * @see https://github.com/project-kessel/kessel-sdk-browser/tree/master/packages/react-kessel-access-check#useselfaccesscheck
 * @see https://github.com/RedHatInsights/rbac-config/blob/master/configs/stage/schemas/src/ros.ksl
 */
const App = () => {
    const chrome = useChrome();
    const isKesselEnabled = useFeatureFlag('ros-frontend.kessel-enabled');

    console.log("Kessel Enabled feature flag:", isKesselEnabled);

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
