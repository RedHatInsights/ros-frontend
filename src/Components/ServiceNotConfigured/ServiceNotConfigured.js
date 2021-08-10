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
            <EmptyStateBody>
                <Bullseye>
                    <Stack hasGutter>
                        <StackItem>To start configuration, follow these steps.</StackItem>
                        <StackItem>
                            1. Prerequisites: insights-client, ansible (Read FAQ if you
                don&apos;t know how to install it).
                        </StackItem>
                        <StackItem>
                            2. Download and run playbook.
                        </StackItem>
                        <StackItem>
                            <ClipboardCopy>
                                curl -O https://raw.githubusercontent.com/RedHatInsights/ros-backend/main/ansible-playbooks/ros_install_and_set_up.yml
                            </ClipboardCopy>
                        </StackItem>
                        <StackItem>
                            Append localhost to /etc/ansible/hosts
                        </StackItem>
                        <StackItem>
                            <ClipboardCopy>ansible-playbook -c local ros_install_and_set_up.yml</ClipboardCopy>
                        </StackItem>
                        <StackItem>
                            3. Wait <strong>24 hours</strong> for your upload to complete.
                            At completion, metrics from the previous day will be provided.
                        </StackItem>
                    </Stack>
                </Bullseye>
            </EmptyStateBody>
            <Button component="a" href="https://access.redhat.com/articles/6245921" target="_blank" variant="primary">
                Getting started documentation
            </Button>
        </EmptyState>
    </Bullseye>
);
