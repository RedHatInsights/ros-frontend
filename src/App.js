import PropTypes from 'prop-types';
import React, { createContext, Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Routes } from './Routes';
import './App.scss';

import NotificationsPortal from '@redhat-cloud-services/frontend-components-notifications/NotificationPortal';
import { notificationsReducer } from '@redhat-cloud-services/frontend-components-notifications/redux';
import { systemRecsReducer, systemDetailReducer } from './store/reducers';
import { register } from './store';
import Cookies from 'js-cookie';

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
        const params = new URLSearchParams(this.props.location.search);
        if (params.get('cs_ros_beta_enable')) {
            Cookies.set('cs_ros_beta_enable', 1);
            params.delete('cs_ros_beta_enable');
            location.href = `${location.pathname}?${params.toString()}`;
        }

        register({
            notifications: notificationsReducer,
            systemDetailReducer,
            systemRecsReducer });
        insights.chrome.init();
        // TODO change this to your appname
        insights.chrome.identifyApp('ros');
        this.appNav = insights.chrome.on('APP_NAVIGATION', event => this.props.history.push(`/${event.navId}`));

        (async () => {
            const rosPermissions = await insights.chrome.getUserPermissions('ros');
            const permissionsList = rosPermissions.map(permissions => permissions.permission);
            this.handlePermissionsUpdate(
                permissionsList.some((permission) => this.hasPermission(permission, ['ros:*:*', 'ros:*:read']))
            );
        })();

    }

    componentWillUnmount () {
        this.appNav();
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
    location: PropTypes.object,
    history: PropTypes.object
};

/**
 * withRouter: https://reacttraining.com/react-router/web/api/withRouter
 * connect: https://github.com/reactjs/react-redux/blob/master/docs/api.md
 *          https://reactjs.org/docs/higher-order-components.html
 */
export default withRouter (connect()(App));
