import React from 'react';
import { Progress } from '@patternfly/react-core';
import propTypes from 'prop-types';

export const ProgressScoreBar = ({ utilizedValue, measureLocation, eleId }) =>  {
    return (
        <React.Fragment>
            <Progress aria-label="progress score bar" value={ utilizedValue }
                className={ `progress-score-bar blue-300` }
                measureLocation={ measureLocation }
                {  ...(eleId ? { id: eleId } : null) }
                data-testid='progress-score-bar' />
        </React.Fragment>
    );
};

ProgressScoreBar.propTypes = {
    measureLocation: propTypes.string,
    valueScore: propTypes.number,
    utilizedValue: propTypes.number,
    eleId: propTypes.string
};
