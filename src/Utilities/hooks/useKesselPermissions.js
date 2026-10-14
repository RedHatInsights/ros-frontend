import { useMemo } from 'react';
import { useSelfAccessCheck } from '@project-kessel/react-kessel-access-check';
import { getKesselAccessCheckParams } from '@redhat-cloud-services/frontend-components-utilities/kesselPermissions';
import { useFetchDefaultWorkspaceId } from './useFetchDefaultWorkspaceId';

/**
 * ROS host-centric access is modeled as ros_read_analysis_assigned, which
 * inherits down the workspace tree in Kessel. The UI only needs to know
 * whether the user can open the app, so we check that relation on the
 * default workspace and leave child-workspace filtering to the backend.
 *
 * @see https://github.com/RedHatInsights/rbac-config/blob/master/configs/stage/schemas/src/ros.ksl
 * @see https://github.com/RedHatInsights/rbac-config/blob/master/configs/prod/schemas/src/ros.ksl
 * @see https://github.com/project-kessel/kessel-sdk-browser/tree/master/packages/react-kessel-access-check#useselfaccesscheck
 */
export const PERMISSION_MAP = {
    'ros:analysis:read': 'ros_read_analysis_assigned'
};

export const useKesselPermissions = (requiredPermissions, enabled = true) => {
    const {
        workspaceId,
        isLoading: workspaceLoading,
        error: workspaceError
    } = useFetchDefaultWorkspaceId(enabled);

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

    if (workspaceLoading || loading) {
        return { hasAccess: false, isLoading: true };
    }

    if (!workspaceId || workspaceError || error) {
        return { hasAccess: false, isLoading: false };
    }

    /**
     * check.allowed is a boolean — the SDK transforms the raw API enum
     * (ALLOWED_TRUE / ALLOWED_FALSE) into true / false before returning data.
     * @see https://github.com/project-kessel/kessel-sdk-browser/blob/master/packages/react-kessel-access-check/src/core/transformers.ts
     */
    const hasAccess = Array.isArray(data)
        ? data.some((check) => check.allowed)
        : (data?.allowed ?? false);

    return { hasAccess, isLoading: false };
};
