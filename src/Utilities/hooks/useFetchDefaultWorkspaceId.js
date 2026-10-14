import { useEffect, useState } from 'react';
import { fetchDefaultWorkspace } from '@project-kessel/react-kessel-access-check';

let defaultWorkspacePromise = null;

/**
 * Resolves the default workspace UUID for Kessel access checks.
 * Skips the fetch when disabled (i.e. when Kessel is not active).
 */
export const useFetchDefaultWorkspaceId = (enabled = true) => {
    const [workspaceId, setWorkspaceId] = useState(undefined);
    const [isLoading, setIsLoading] = useState(enabled);
    const [error, setError] = useState(null);
    const baseUrl = window.location.origin;

    useEffect(() => {
        if (!enabled) {
            setIsLoading(false);
            return;
        }

        if (!defaultWorkspacePromise) {
            defaultWorkspacePromise = fetchDefaultWorkspace(baseUrl);
        }

        defaultWorkspacePromise
        .then((workspace) => {
            setWorkspaceId(workspace?.id);
            setError(null);
        })
        .catch((err) => {
            defaultWorkspacePromise = null;
            setWorkspaceId(undefined);
            setError(err);
        })
        .finally(() => setIsLoading(false));
    }, [baseUrl, enabled]);

    return {
        workspaceId,
        isLoading,
        error
    };
};
