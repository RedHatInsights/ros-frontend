import PropTypes from 'prop-types';
import React, { createContext, Component } from 'react';
import { ROSRoutes } from './Routes';
import './App.scss';
import NotificationsProvider from '@redhat-cloud-services/frontend-components-notifications/NotificationsProvider';
import { systemRecsReducer, systemDetailReducer, isConfiguredReducer, systemColumnsReducer, suggestedInstanceTypesReducer } from './store/reducers';
import { register } from './store';
import { useChrome } from '@redhat-cloud-services/frontend-components/useChrome';

export const PermissionContext = createContext();

class App extends Component {
    constructor() {
        super();
        this.state = {
            hasReadPermissions: undefined,
            arePermissionsLoaded: false
        };
    }

    handlePermissionsUpdate(hasRead) {
        this.setState({
            hasReadPermissions: hasRead,
            arePermissionsLoaded: true
        });
    }

    hasPermission(permission, permissionList) {
        let hasPermission = false;

        permissionList.forEach((permissions) => {
            if (permission === permissions) {
                hasPermission = true;
            }
        });

        return hasPermission;
    };

    componentDidMount () {
        register({
            systemDetailReducer,
            systemRecsReducer,
            isConfiguredReducer,
            systemColumnsReducer,
            suggestedInstanceTypesReducer
        });

        const chrome = this.props.chrome;
        chrome?.updateDocumentTitle('Resource Optimization - Business');

        (async () => {
            const rosPermissions = await chrome.getUserPermissions('ros', true);
            this.handlePermissionsUpdate(
                rosPermissions.some(({ permission }) => this.hasPermission(permission, ['ros:*:*', 'ros:*:read']))
            );
        })();

    }

    render () {
        const {
            hasReadPermissions,
            arePermissionsLoaded } = this.state;
        return (
            arePermissionsLoaded
                ? <PermissionContext.Provider
                    value={{
                        permissions: {
                            hasRead: hasReadPermissions
                        }
                    }}>
                    <NotificationsProvider>
                        <ROSRoutes />
                    </NotificationsProvider>
                </PermissionContext.Provider>
                : null
        );
    }
}

App.propTypes = {
    chrome: PropTypes.object
};

const AppWithChrome = props => {
    const chrome = useChrome();

    return (
        <App {...props} chrome={ chrome } />
    );
};

export default AppWithChrome;
