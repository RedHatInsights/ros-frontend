import { Bullseye, EmptyState, EmptyStateIcon, Title } from '@patternfly/react-core';
import { WrenchIcon } from '@patternfly/react-icons';
import React from 'react';
import './ServiceNotConfigured.scss';

export const ServiceNotConfigured = () => (
    <Bullseye>
        <EmptyState className='empty-state-not-configured'>
            <EmptyStateIcon icon={WrenchIcon} />
            <Title headingLevel="h5" size="lg">
                Resource optimization is not yet configured
            </Title>
        </EmptyState>
    </Bullseye>
);
