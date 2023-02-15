import { Route, Routes, Navigate } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import { Bullseye, Spinner } from '@patternfly/react-core';

const RosPage = lazy(() => import(/* webpackChunkName: "RosPage" */ './Routes/RosPage/RosPage'));
const RosSystemDetail = lazy(() => import(/* webpackChunkName: "RosSystemDetail" */ './Routes/RosSystemDetail/RosSystemDetail'));
const RosSuggestedInstance = lazy(() => import(/* webpackChunkName: "RosSuggestedInstance" */ './Routes/RosSuggestedInstance/RosSuggestedInstance'));

export const ROSRoutes = () => (
    <Suspense fallback={<Bullseye>
        <Spinner />
    </Bullseye>}>
        <Routes>
            <Route path='/' element={<RosPage/>} />
            <Route path='/suggested-instance-types' component={RosSuggestedInstance}/>
            <Route path=':inventoryId' element={<RosSystemDetail/>} />
            <Navigate to='/ros' />
        </Routes>
    </Suspense>
);

