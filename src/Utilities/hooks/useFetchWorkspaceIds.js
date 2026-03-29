import { useState, useEffect } from 'react';

const RBAC_WORKSPACE_API_PATH = '/api/rbac/v2/workspaces/';

let allWorkspacesPromise = null;

/**
 * Paginates through the RBAC workspaces API to fetch all workspaces.
 */
export async function fetchAllWorkspaces(baseUrl) {
    const workspaces = [];
    const limit = 1000;

    for (let offset = 0; ; offset += limit) {
        const response = await fetch(
            `${baseUrl}${RBAC_WORKSPACE_API_PATH}?limit=${limit}&offset=${offset}`
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch workspaces: ${response.status}`);
        }

        const body = await response.json();
        const page = body.data ?? [];
        workspaces.push(...page);

        const total = body.meta?.count;
        if (page.length < limit) {
            break;
        }

        if (typeof total === 'number' && workspaces.length >= total) {
            break;
        }
    }

    return workspaces;
}

/**
 * Fetches all RBAC workspace IDs with pagination and simple promise caching.
 * Skips the fetch when disabled (i.e. when Kessel is not active).
 */
export const useFetchWorkspaceIds = (enabled = true) => {
    const [workspaceIds, setWorkspaceIds] = useState(undefined);
    const [isLoading, setIsLoading] = useState(enabled);
    const [error, setError] = useState(null);
    const baseUrl = window.location.origin;

    useEffect(() => {
        if (!enabled) {
            return;
        }

        if (!allWorkspacesPromise) {
            allWorkspacesPromise = fetchAllWorkspaces(baseUrl);
        }

        allWorkspacesPromise
        .then((workspaces) => {
            const ids = workspaces
            .map((workspace) => workspace?.id)
            .filter(Boolean);
            setWorkspaceIds(ids);
            setError(null);
        })
        .catch((err) => {
            allWorkspacesPromise = null;
            setWorkspaceIds(undefined);
            setError(err);
        })
        .finally(() => setIsLoading(false));
    }, [baseUrl, enabled]);

    return {
        workspaceIds,
        isLoading,
        error
    };
};
