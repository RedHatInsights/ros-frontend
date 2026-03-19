import { useState, useEffect } from 'react';
import { fetchDefaultWorkspace } from '@project-kessel/react-kessel-access-check';

/**
 * @see https://github.com/project-kessel/kessel-sdk-browser/tree/master/packages/react-kessel-access-check#fetchrootworkspace--fetchdefaultworkspace
 */
let defaultWorkspacePromise = null;

export const clearDefaultWorkspaceFetchCache = () => {
    defaultWorkspacePromise = null;
};

export const fetchDefaultWorkspaceDetails = (
    rbacBaseEndpoint,
    auth,
    httpClient
) => {
    const base =
        rbacBaseEndpoint ??
        (typeof window !== 'undefined' ? window.location.origin : '');
    const useSharedCache =
        auth === undefined && httpClient === undefined;

    if (useSharedCache) {
        if (!defaultWorkspacePromise) {
            defaultWorkspacePromise = fetchDefaultWorkspace(base).catch((err) => {
                defaultWorkspacePromise = null;
                throw err;
            });
        }

        return defaultWorkspacePromise;
    }

    return fetchDefaultWorkspace(base, auth, httpClient);
};

export const useFetchDefaultWorkspace = (options = {}) => {
    const { enabled = true, rbacBaseEndpoint } = options;

    const baseUrl =
        rbacBaseEndpoint ??
        (typeof window !== 'undefined' ? window.location.origin : '');

    const [defaultWorkspace, setDefaultWorkspace] = useState(null);
    const [isLoading, setIsLoading] = useState(Boolean(enabled));
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!enabled) {
            setIsLoading(false);
            return undefined;
        }

        let cancelled = false;

        setIsLoading(true);
        setError(null);

        fetchDefaultWorkspaceDetails(baseUrl)
        .then((ws) => {
            if (!cancelled) {
                setDefaultWorkspace(ws);
            }
        })
        .catch((err) => {
            if (!cancelled) {
                setError(err);
            }
        })
        .finally(() => {
            if (!cancelled) {
                setIsLoading(false);
            }
        });

        return () => {
            cancelled = true;
        };
    }, [enabled, baseUrl]);

    return {
        defaultWorkspace,
        workspaceId: defaultWorkspace?.id,
        isLoading,
        error
    };
};
