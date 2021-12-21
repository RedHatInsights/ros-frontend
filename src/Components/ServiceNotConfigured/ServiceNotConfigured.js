import {
    Bullseye, EmptyState, EmptyStateBody,
    EmptyStateIcon, Title, Stack,
    StackItem, ClipboardCopy, Button
} from '@patternfly/react-core';
import { WrenchIcon } from '@patternfly/react-icons';
import React from 'react';
import './ServiceNotConfigured.scss';

export const ServiceNotConfigured = () => (
    <Bullseye>
        <EmptyState className="empty-state-not-configured">
            <EmptyStateIcon icon={WrenchIcon} />
            <Title headingLevel="h5" size="lg">
              Resource optimization isn&apos;t configured yet
            </Title>
            <Button component="a" href="https://access.redhat.com/documentation/en-us/red_hat_insights/2022/html/assessing_and_monitoring_rhel_resource_optimization_with_insights_for_red_hat_enterprise_linux/proc-ros-install_ros-getting-started" target="_blank" variant="primary">
                Check our getting started documentation to configure it.
            </Button>
        </EmptyState>
    </Bullseye>
);
