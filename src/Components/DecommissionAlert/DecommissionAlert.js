import React from 'react';
import { Alert } from '@patternfly/react-core';

export const DecommissionAlert = () => (
    <Alert
        className="alertOverride"
        variant="info"
        isInline
        title="Notice: Red Hat Lightspeed Resource Optimization will be decommissioned on January 29, 2027"
        ouiaId="ros-decommission-alert"
    />
);
