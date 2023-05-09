import React, { Suspense } from 'react';
import { Bullseye, Spinner } from '@patternfly/react-core';
import AsynComponent from '@redhat-cloud-services/frontend-components/AsyncComponent';
import ErrorState from '@redhat-cloud-services/frontend-components/ErrorState';

export const ServiceNotConfigured = () => (
    <Suspense fallback={<Bullseye>
        <Spinner />
    </Bullseye>}>
        <AsynComponent
            appName="dashboard"
            module="./AppZeroState"
            scope="dashboard"
            ErrorComponent={<ErrorState />}
            app="Resource_Optimization"
        />
    </Suspense>
);
