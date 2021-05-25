import { Bullseye, EmptyState, EmptyStateIcon, Title } from '@patternfly/react-core';
import { WrenchIcon } from '@patternfly/react-icons';
import React from 'react';

export const ServiceNotConfigured = () => (
    <Bullseye>
        <EmptyState style={{ paddingTop: 40 }}>
            <EmptyStateIcon icon={WrenchIcon} />
            <Title headingLevel="h5" size="lg">
                Resource optimization is not yet configured
            </Title>
        </EmptyState>
    </Bullseye>
);
