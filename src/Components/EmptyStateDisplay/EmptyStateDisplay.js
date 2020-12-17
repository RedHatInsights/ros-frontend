import React from 'react';
import PropTypes from 'prop-types';

import { EmptyState, EmptyStateBody, EmptyStateIcon, EmptyStateVariant, Title } from '@patternfly/react-core';

export const EmptyStateDisplay = ({ button, color, error, icon, isSmall, text, title }) => (
    <EmptyState variant={ isSmall ? EmptyStateVariant.small : EmptyStateVariant.large }>
        { icon && <EmptyStateIcon
            icon={ icon }
            color={ color ? color : null }
            className={ isSmall ? 'small-empty-state-icon' : null }
        /> }
        <Title
            headingLevel={ isSmall ? 'h5' : 'h1' }
            size={ isSmall ? 'md' : 'lg' }
        >
            { title }
        </Title>
        <EmptyStateBody>
            { text?.join('\n') }
            { error }
        </EmptyStateBody>
        { button }
    </EmptyState>
);

EmptyStateDisplay.propTypes = {
    button: PropTypes.object,
    color: PropTypes.string,
    error: PropTypes.string,
    icon: PropTypes.any,
    isSmall: PropTypes.bool,
    text: PropTypes.array,
    title: PropTypes.string
};
