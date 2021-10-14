import React from 'react';
import { Progress } from '@patternfly/react-core';
import propTypes from 'prop-types';

export const ProgressScoreBar = ({ utilizedValue, measureLocation, eleId }) =>  {
    return (
        <React.Fragment>
            <Progress value={ utilizedValue }
                className={ `progress-score-bar blue-200` }
                measureLocation={ measureLocation }
                {  ...(eleId ? { id: eleId } : null) } />
        </React.Fragment>
    );
};

ProgressScoreBar.propTypes = {
    measureLocation: propTypes.string,
    valueScore: propTypes.number,
    utilizedValue: propTypes.number,
    eleId: propTypes.string
};
