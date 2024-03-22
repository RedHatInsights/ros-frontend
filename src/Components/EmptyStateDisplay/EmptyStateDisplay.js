import React from 'react';
import PropTypes from 'prop-types';

import { EmptyState, EmptyStateBody, EmptyStateIcon, EmptyStateVariant, EmptyStateHeader, EmptyStateFooter  } from '@patternfly/react-core';

export const EmptyStateDisplay = ({ button, color, error, icon, isSmall, text, title }) => (
    <EmptyState variant={ isSmall ? EmptyStateVariant.sm : EmptyStateVariant.lg }>
        { icon && <EmptyStateIcon
            icon={ icon }
            color={ color ? color : null }
            className={ isSmall ? 'small-empty-state-icon' : null }
        /> }
        <EmptyStateHeader titleText={<>{ title }</>} headingLevel={ isSmall ? 'h5' : 'h1' } />
        <EmptyStateBody>
            { text?.join('\n') }
            { error }
        </EmptyStateBody><EmptyStateFooter>
            { button }
        </EmptyStateFooter></EmptyState>
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
