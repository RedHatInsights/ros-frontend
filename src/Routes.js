import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Suspense, lazy } from 'react';
import { routes as paths } from '../package.json';
import { Bullseye, Spinner } from '@patternfly/react-core';

const RosPage = lazy(() => import(/* webpackChunkName: "RosPage" */ './Routes/RosPage/RosPage'));
const RosSystemDetail = lazy(() => import(/* webpackChunkName: "RosSystemDetail" */ './Routes/RosSystemDetail/RosSystemDetail'));

export const Routes = () => (
    <Suspense fallback={<Bullseye>
        <Spinner />
    </Bullseye>}>
        <Switch>
            <Route exact path='/' component={RosPage} />
            <Route path={paths.rosSystemDetail} component={RosSystemDetail} />
            <Route>
                <Redirect to={paths.rosPage} />
            </Route>
        </Switch>
    </Suspense>
);

Routes.propTypes = {
    childProps: PropTypes.shape({
        history: PropTypes.shape({
            push: PropTypes.func
        })
    })
};
