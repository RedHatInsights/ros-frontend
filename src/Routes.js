import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Bullseye, Spinner } from '@patternfly/react-core';
import AsynComponent from '@redhat-cloud-services/frontend-components/AsyncComponent';
import ErrorState from '@redhat-cloud-services/frontend-components/ErrorState';
import axios from 'axios';

const RosPage = lazy(() => import(/* webpackChunkName: "RosPage" */ './Routes/RosPage/RosPage'));
const RosSystemDetail = lazy(() => import(/* webpackChunkName: "RosSystemDetail" */ './Routes/RosSystemDetail/RosSystemDetail'));

const INVENTORY_TOTAL_FETCH_URL = '/api/inventory/v1/hosts';

export const Routes = () => {
    const [hasSystems, setHasSystems] = useState(false);
    useEffect(() => {
        try {
            axios
            .get(`${INVENTORY_TOTAL_FETCH_URL}?page=1&per_page=1`)
            .then(({ data }) => {
                setHasSystems(data.total > 0);
            });
        } catch (e) {
            console.log(e);
        }
    }, [setHasSystems]);

    return (
        <Suspense fallback={<Bullseye>
            <Spinner />
        </Bullseye>}>
            {!hasSystems ?
                <AsynComponent
                    appName="dashboard"
                    module="./AppZeroState"
                    scope="dashboard"
                    ErrorComponent={<ErrorState />}
                    app="Resource_Optimization"
                /> :
                <Switch>
                    <Route exact path='/' component={RosPage} />
                    <Route path='/:inventoryId' component={RosSystemDetail} />
                    <Route>
                        <Redirect to='/ros' />
                    </Route>
                </Switch>
            }
        </Suspense>);
};

Routes.propTypes = {
    childProps: PropTypes.shape({
        history: PropTypes.shape({
            push: PropTypes.func
        })
    })
};
