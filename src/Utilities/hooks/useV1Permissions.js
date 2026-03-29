import { useState, useEffect } from 'react';

/**
 * v1 permission check — uses chrome.getUserPermissions (legacy RBAC).
 * Skips the fetch when disabled (i.e. when Kessel is active).
 */
export const useV1Permissions = (chrome, enabled) => {
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
