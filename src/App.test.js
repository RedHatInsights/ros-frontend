import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('./Routes', () => ({
    ROSRoutes: () => <div data-testid="ros-routes">ROSRoutes</div>
}));

jest.mock(
    '@redhat-cloud-services/frontend-components-notifications/NotificationsProvider',
    () => ({
        __esModule: true,
        default: ({ children }) => <>{children}</>
    })
);

jest.mock('./store', () => ({
    register: jest.fn()
}));

jest.mock('@redhat-cloud-services/frontend-components/useChrome', () => ({
    useChrome: jest.fn()
}));

jest.mock('./Utilities/useFeatureFlag', () => jest.fn());

jest.mock('@unleash/proxy-client-react', () => ({
    ...jest.requireActual('@unleash/proxy-client-react'),
    useFlagsStatus: jest.fn(() => ({ flagsReady: true }))
}));

jest.mock('./Utilities/hooks/useKesselPermissions');
jest.mock('./Utilities/hooks/useV1Permissions');

import App from './App';
import { register } from './store';
import useFeatureFlag from './Utilities/useFeatureFlag';
import { useFlagsStatus } from '@unleash/proxy-client-react';
import { useKesselPermissions } from './Utilities/hooks/useKesselPermissions';
import { useV1Permissions } from './Utilities/hooks/useV1Permissions';
import { useChrome } from '@redhat-cloud-services/frontend-components/useChrome';

describe('App', () => {
    const mockUpdateDocumentTitle = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        useChrome.mockReturnValue({
            updateDocumentTitle: mockUpdateDocumentTitle,
            getUserPermissions: jest.fn().mockResolvedValue([])
        });
        useFlagsStatus.mockReturnValue({ flagsReady: true });
        useFeatureFlag.mockReturnValue(false);
        useKesselPermissions.mockReturnValue({
            hasAccess: false,
            isLoading: false
        });
        useV1Permissions.mockReturnValue({
            hasAccess: true,
            isLoading: false
        });
    });

    it('shows a centered spinner while feature flags are not ready', () => {
        useFlagsStatus.mockReturnValue({ flagsReady: false });

        const { container } = render(<App />);

        expect(
            container.querySelector('.pf-v6-c-spinner')
        ).toBeInTheDocument();
        expect(screen.queryByTestId('ros-routes')).not.toBeInTheDocument();
    });

    it('shows a spinner while V1 permissions are loading', () => {
        useFeatureFlag.mockReturnValue(false);
        useV1Permissions.mockReturnValue({
            hasAccess: false,
            isLoading: true
        });

        const { container } = render(<App />);

        expect(
            container.querySelector('.pf-v6-c-spinner')
        ).toBeInTheDocument();
        expect(screen.queryByTestId('ros-routes')).not.toBeInTheDocument();
    });

    it('shows a spinner while Kessel permissions are loading', () => {
        useFeatureFlag.mockReturnValue(true);
        useKesselPermissions.mockReturnValue({
            hasAccess: false,
            isLoading: true
        });

        const { container } = render(<App />);

        expect(
            container.querySelector('.pf-v6-c-spinner')
        ).toBeInTheDocument();
        expect(screen.queryByTestId('ros-routes')).not.toBeInTheDocument();
    });

    it('renders routes when flags are ready and V1 permissions have finished loading', () => {
        useFeatureFlag.mockReturnValue(false);
        useV1Permissions.mockReturnValue({
            hasAccess: true,
            isLoading: false
        });

        render(<App />);

        expect(screen.getByTestId('ros-routes')).toBeInTheDocument();
    });

    it('renders routes when flags are ready and Kessel permissions have finished loading', () => {
        useFeatureFlag.mockReturnValue(true);
        useKesselPermissions.mockReturnValue({
            hasAccess: true,
            isLoading: false
        });

        render(<App />);

        expect(screen.getByTestId('ros-routes')).toBeInTheDocument();
    });

    it('registers store reducers and sets the document title on mount', () => {
        render(<App />);

        expect(register).toHaveBeenCalledTimes(1);
        expect(register).toHaveBeenCalledWith({
            systemDetailReducer: expect.anything(),
            systemRecsReducer: expect.anything(),
            isConfiguredReducer: expect.anything(),
            systemColumnsReducer: expect.anything(),
            suggestedInstanceTypesReducer: expect.anything()
        });
        expect(mockUpdateDocumentTitle).toHaveBeenCalledWith(
            'Resource Optimization - Business'
        );
    });
});
