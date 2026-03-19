import { useMemo } from 'react';
import { useSelfAccessCheck } from '@project-kessel/react-kessel-access-check';
import { getKesselAccessCheckParams } from '@redhat-cloud-services/frontend-components-utilities/kesselPermissions';
import { useFetchDefaultWorkspace } from './useDefaultWorkspace';

/**
 * @see https://github.com/RedHatInsights/rbac-config/blob/master/configs/stage/schemas/src/ros.ksl
 */
export const PERMISSION_MAP = {
    'ros:analysis:read': 'ros_read_analysis'
};

export const useKesselPermissions = (requiredPermissions) => {
    const {
        workspaceId,
        isLoading: workspaceLoading,
        error: workspaceError
    } = useFetchDefaultWorkspace();

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
