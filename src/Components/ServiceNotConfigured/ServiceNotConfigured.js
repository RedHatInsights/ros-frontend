import React, { Fragment, Suspense } from 'react';
import { Bullseye, Spinner } from '@patternfly/react-core';
import AsynComponent from '@redhat-cloud-services/frontend-components/AsyncComponent';
import ErrorState from '@redhat-cloud-services/frontend-components/ErrorState';
import { DecommissionAlert } from '../../Components/DecommissionAlert/DecommissionAlert';

export const ServiceNotConfigured = () => (
    <Fragment>
        <DecommissionAlert />
        <Suspense fallback={<Bullseye>
            <Spinner />
        </Bullseye>}>
            <AsynComponent
                appId="ros_zero_state"
                appName="dashboard"
                module="./AppZeroState"
                scope="dashboard"
                ErrorComponent={<ErrorState />}
                app="Resource_Optimization"
            />
        </Suspense>
    </Fragment>
);
