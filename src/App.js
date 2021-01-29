import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Routes } from './Routes';
import './App.scss';

import { NotificationsPortal, notifications } from '@redhat-cloud-services/frontend-components-notifications/';
import { systemsTableRootReducer } from './Components/RosTable/redux';
import { register } from './store';

class App extends Component {

    componentDidMount () {
        register({ notifications, systemsTableState: systemsTableRootReducer });
        insights.chrome.init();
        // TODO change this to your appname
        insights.chrome.identifyApp('ros');

        this.appNav = insights.chrome.on('APP_NAVIGATION', event => this.props.history.push(`/${event.navId}`));
    }

    componentWillUnmount () {
        this.appNav();
    }

    render () {
        return (
            <React.Fragment>
                <NotificationsPortal />
                <Routes childProps={ this.props } />
            </React.Fragment>
        );
    }
}

App.propTypes = {
    history: PropTypes.object
};

/**
 * withRouter: https://reacttraining.com/react-router/web/api/withRouter
 * connect: https://github.com/reactjs/react-redux/blob/master/docs/api.md
 *          https://reactjs.org/docs/higher-order-components.html
 */
export default withRouter (connect()(App));
