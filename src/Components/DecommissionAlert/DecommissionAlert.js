import React from 'react';
import { Alert } from '@patternfly/react-core';

export const DecommissionAlert = () => (
    <Alert
        className="alertOverride"
        variant="info"
        isInline
        title={
            <>
                Notice: Red Hat Lightspeed{' '}
                <a href="https://access.redhat.com/articles/7133051" target="_blank" rel="noopener noreferrer">
                    Resource Optimization will be decommissioned
                </a>
                {' '}on January 29, 2027.
            </>
        }
        ouiaId="ros-decommission-alert"
    />
);
