import React from 'react';
import PropTypes from 'prop-types';

import { EmptyState, EmptyStateBody, EmptyStateVariant, EmptyStateFooter  } from '@patternfly/react-core';

export const EmptyStateDisplay = ({ button, color, error, Icon, isSmall, text, title }) => (
    <EmptyState
        variant={ isSmall ? EmptyStateVariant.sm : EmptyStateVariant.lg }
        titleText={<>{ title }</>}
        headingLevel={ isSmall ? 'h5' : 'h1' }
        icon={
            Icon ? <Icon color={ color ? color : null } className={ isSmall ? 'small-empty-state-icon' : null }/> : null }

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
    color: PropTypes.string,
    error: PropTypes.string,
    Icon: PropTypes.elementType,
    isSmall: PropTypes.bool,
    text: PropTypes.array,
    title: PropTypes.string
};
