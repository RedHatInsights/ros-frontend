import React from 'react';
import PropTypes from 'prop-types';

import { EmptyState, EmptyStateBody, EmptyStateVariant, EmptyStateFooter  } from '@patternfly/react-core';

export const EmptyStateDisplay = ({ button, status, error, icon, isSmall, text, title }) => (
    <EmptyState
        variant={ isSmall ? EmptyStateVariant.sm : EmptyStateVariant.lg }
        titleText={<>{ title }</>}
        headingLevel={ isSmall ? 'h5' : 'h1' }
        status={status}
        icon={icon ?  icon : null }
    >
        <EmptyStateBody>
            { text?.join('\n') }
            { error }
        </EmptyStateBody><EmptyStateFooter>
            { button }
        </EmptyStateFooter>
    </EmptyState>
);

EmptyStateDisplay.propTypes = {
    button: PropTypes.object,
    status: PropTypes.string,
    error: PropTypes.string,
    icon: PropTypes.elementType,
    isSmall: PropTypes.bool,
    text: PropTypes.array,
    title: PropTypes.string
};
