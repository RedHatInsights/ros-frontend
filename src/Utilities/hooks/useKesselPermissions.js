import { useMemo } from 'react';
import { useSelfAccessCheck } from '@project-kessel/react-kessel-access-check';
import { getKesselAccessCheckParams } from '@redhat-cloud-services/frontend-components-utilities/kesselPermissions';
import { useFetchWorkspaceIds } from './useFetchWorkspaceIds';

/**
 * ROS has a single contingent permission (ros_read_analysis) that depends on
 * inventory_host_view. Because the contingent permission only lights up on
 * workspaces where BOTH inventory_host_view AND ros_read_analysis_assigned
 * exist, we must check ALL workspaces — not just the default one.
 * Access is granted if the permission is allowed on ANY workspace.
 *
 * @see https://github.com/RedHatInsights/rbac-config/blob/master/configs/stage/schemas/src/ros.ksl
 * @see https://github.com/RedHatInsights/rbac-config/blob/master/configs/prod/schemas/src/ros.ksl
 * @see https://github.com/project-kessel/kessel-sdk-browser/tree/master/packages/react-kessel-access-check#useselfaccesscheck
 */
export const PERMISSION_MAP = {
    'ros:analysis:read': 'ros_read_analysis'
};

export const useKesselPermissions = (requiredPermissions, enabled = true) => {
    const {
        workspaceIds,
        isLoading: workspaceLoading,
        error: workspaceError
    } = useFetchWorkspaceIds(enabled);

    const checkParams = useMemo(
        () =>
            getKesselAccessCheckParams({
                permissionMap: PERMISSION_MAP,
                requiredPermissions,
                resourceIdOrIds: workspaceIds
            }),
        [workspaceIds, requiredPermissions]
    );

    const { data, loading, error } = useSelfAccessCheck(checkParams);

    if (workspaceLoading) {
        return { hasAccess: false, isLoading: true };
    }

    if (checkParams?.resources?.length === 0) {
        return { hasAccess: true, isLoading: false };
    }

    if (!workspaceIds?.length || workspaceError || error) {
        return { hasAccess: false, isLoading: false };
    }

    const hasAccess = Array.isArray(data)
        ? data.some((check) => check.allowed)
        : (data?.allowed ?? false);

    return { hasAccess, isLoading: loading };
};
