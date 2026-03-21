import { useMemo } from 'react';
import { useSelfAccessCheck } from '@project-kessel/react-kessel-access-check';
import { getKesselAccessCheckParams } from '@redhat-cloud-services/frontend-components-utilities/kesselPermissions';
import { useFetchDefaultWorkspaceId } from './useDefaultWorkspace';

/**
 * @see https://github.com/RedHatInsights/rbac-config/blob/master/configs/stage/schemas/src/ros.ksl
 * @see https://github.com/RedHatInsights/rbac-config/blob/master/configs/prod/schemas/src/ros.ksl
 * @see https://github.com/project-kessel/kessel-sdk-browser/tree/master/packages/react-kessel-access-check#useselfaccesscheck 
 */
export const PERMISSION_MAP = {
    'ros:analysis:read': 'ros_read_analysis'
};

export const useKesselPermissions = (requiredPermissions) => {
    const {
        workspaceId,
        isLoading: workspaceLoading,
        error: workspaceError
    } = useFetchDefaultWorkspaceId();

    const checkParams = useMemo(
        () =>
            getKesselAccessCheckParams({
                permissionMap: PERMISSION_MAP,
                requiredPermissions,
                resourceIdOrIds: workspaceId
            }),
        [workspaceId, requiredPermissions]
    );

    const { data, loading, error } = useSelfAccessCheck(checkParams);

    if (workspaceLoading) {
        return { hasAccess: false, isLoading: workspaceLoading };
    }

    if (checkParams?.resources?.length === 0) {
        return { hasAccess: true, isLoading: false };
    }

    if (!workspaceId || workspaceError || error) {
        return { hasAccess: false, isLoading: false };
    }

    const hasAccess = Array.isArray(data)
        ? data.every((check) => check.allowed)
        : (data?.allowed ?? false);

    return { hasAccess, isLoading: loading };
};
