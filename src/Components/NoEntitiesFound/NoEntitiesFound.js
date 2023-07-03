import React from 'react';
import {
    Title,
    Button,
    EmptyState,
    EmptyStateBody,
    EmptyStateIcon,
    EmptyStateVariant,
    EmptyStatePrimary
} from '@patternfly/react-core';
import { CheckCircleIcon } from '@patternfly/react-icons';
import { GETTING_STARTED_DOC } from '../../constants';

export default function NoEntitiesFound() {
    return (
        <EmptyState variant={EmptyStateVariant.large}>
            <EmptyStateIcon icon={CheckCircleIcon} color='green'/>
            <Title headingLevel="h5" size="lg">
                No suggested instance types found
            </Title>
            <EmptyStateBody>
                {/* eslint-disable-next-line max-len */}
                All the systems that are sending data are optimized. Visit getting started documentation to add more systems to Resource Optimization to see more suggestions.
            </EmptyStateBody>
            <EmptyStatePrimary>
                <Button component='a' variant='primary' href={GETTING_STARTED_DOC} target='_blank'>Getting started documentation</Button>
            </EmptyStatePrimary>
        </EmptyState>
    );
}
