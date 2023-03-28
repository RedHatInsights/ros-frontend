import PropTypes from 'prop-types';
import React, { createContext, Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Routes } from './Routes';
import './App.scss';
import NotificationsPortal from '@redhat-cloud-services/frontend-components-notifications/NotificationPortal';
import { notificationsReducer } from '@redhat-cloud-services/frontend-components-notifications/redux';
import { systemRecsReducer, systemDetailReducer, isConfiguredReducer, systemColumnsReducer } from './store/reducers';
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
            notifications: notificationsReducer,
            systemDetailReducer,
            systemRecsReducer,
            isConfiguredReducer,
            systemColumnsReducer
        });

        const chrome = this.props.chrome;
        chrome?.identifyApp('ros');
        this.unregister = chrome.on('APP_NAVIGATION', (event) => {
            if (event.navId === 'ros') {
                this.props.history.push(`/${location.search}${location.hash}`);
            } else {
                this.props.history.push(`/${event.navId}${location.search}${location.hash}`);
            }
        });
        (async () => {
            const rosPermissions = await chrome.getUserPermissions('ros', true);
            this.handlePermissionsUpdate(
                rosPermissions.some(({ permission }) => this.hasPermission(permission, ['ros:*:*', 'ros:*:read']))
            );
        })();

    }

    componentWillUnmount () {
        if (typeof this.unregister === 'function') {
            this.unregister();
        }
    }

    render () {
        const {
            hasReadPermissions,
            arePermissionsLoaded } = this.state;
        return (
            arePermissionsLoaded
                ? <PermissionContext.Provider
                    value={ {
                        permissions: {
                            systemsRead: hasReadPermissions
                        }
                    } }>
                    <NotificationsPortal />
                    <Routes childProps={ this.props } />
                </PermissionContext.Provider>
                : null
        );
    }
}

App.propTypes = {
    history: PropTypes.object,
    chrome: PropTypes.object
};

const AppWithChrome = props => {
    const chrome = useChrome();

    return (
        <App {...props} chrome={ chrome } />
    );
};

/**
 * withRouter: https://reacttraining.com/react-router/web/api/withRouter
 * connect: https://github.com/reactjs/react-redux/blob/master/docs/api.md
 *          https://reactjs.org/docs/higher-order-components.html
 */
export default withRouter (connect()(AppWithChrome));
