import React from 'react';
import { Progress } from '@patternfly/react-core';
import propTypes from 'prop-types';

export const ProgressScoreBar = ({ valueScore, measureLocation }) =>  {
    const calNumScore = Math.round(valueScore / 20);
    const textLabel = `${ calNumScore }/5`;
    const colorclass = (val) =>  ({
        5: 'green-400',
        4: 'green-100',
        3: 'gold-400',
        2: 'orange-300'
    }[val] || 'danger-200');

    return (
        <React.Fragment>
            <Progress value={ calNumScore } min={0} max={5} label={ textLabel }
                valueText={ textLabel }
                className={ `progress-score-bar ${colorclass(calNumScore)}` }
                measureLocation={ measureLocation } />
        </React.Fragment>
    );
};

ProgressScoreBar.propTypes = {
    measureLocation: propTypes.string,
    valueScore: propTypes.number
};
