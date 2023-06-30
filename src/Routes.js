import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Suspense, lazy } from 'react';
import { Bullseye, Spinner } from '@patternfly/react-core';

const RosPage = lazy(() => import(/* webpackChunkName: "RosPage" */ './Routes/RosPage/RosPage'));
const RosSystemDetail = lazy(() => import(/* webpackChunkName: "RosSystemDetail" */ './Routes/RosSystemDetail/RosSystemDetail'));
const RosSuggestedInstance = lazy(() => import(/* webpackChunkName: "RosSuggestedInstance" */ './Routes/RosSuggestedInstance/RosSuggestedInstance'));

export const Routes = () => (
    <Suspense fallback={<Bullseye>
        <Spinner />
    </Bullseye>}>
        <Switch>
            <Route exact path='/' component={RosPage} />
            <Route path='/suggested-instance-types' component={RosSuggestedInstance}/>
            <Route path='/:inventoryId' component={RosSystemDetail} />
            <Redirect path="*" to='/' />
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
