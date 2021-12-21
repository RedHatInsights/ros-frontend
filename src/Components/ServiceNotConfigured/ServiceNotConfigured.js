import {
    Bullseye, EmptyState, EmptyStateBody,
    EmptyStateIcon, Title, Stack,
    StackItem, Button
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
            <EmptyStateBody>
                <Bullseye>
                    <Stack hasGutter>
                        <StackItem>
                            Resource Optimization requires installing and configuring Performance Co-Pilot on
                            the client system.
                        </StackItem>
                        <StackItem>
                            Check the documentation to find how to configure Resource Optimization with Ansible. An
                            alternative method which does not require Ansible is also described.
                        </StackItem>
                        <StackItem>
                            After configuring Resource Optimization, it may take up to 24 hours until suggestions
                            are available.
                        </StackItem>
                    </Stack>
                </Bullseye>
            </EmptyStateBody>
            { // eslint-disable-next-line max-len }
            <Button component="a" href="https://access.redhat.com/documentation/en-us/red_hat_insights/2022/html/assessing_and_monitoring_rhel_resource_optimization_with_insights_for_red_hat_enterprise_linux/proc-ros-install_ros-getting-started" target="_blank" variant="primary">
                Getting started documentation.
            </Button>
        </EmptyState>
    </Bullseye>
);
