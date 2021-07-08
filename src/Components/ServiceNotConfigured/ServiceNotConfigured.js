import { Bullseye, EmptyState, EmptyStateBody, EmptyStateIcon, Title, Text } from '@patternfly/react-core';
import { WrenchIcon } from '@patternfly/react-icons';
import React from 'react';
import './ServiceNotConfigured.scss';

export const ServiceNotConfigured = () => (
    <Bullseye>
        <EmptyState className='empty-state-not-configured'>
            <EmptyStateIcon icon={WrenchIcon} />
            <Title headingLevel="h5" size="lg">
                Resource optimization isn&apos;t configured yet
            </Title>
            <EmptyStateBody>
                To start configuration, activate this application in the Service Enabled Dashboard.
                <Text>[Start configuration]</Text>
            </EmptyStateBody>
        </EmptyState>
    </Bullseye>
);
