import React from 'react';
import { Progress } from '@patternfly/react-core';
import propTypes from 'prop-types';

export const ProgressScoreBar = ({ valueScore, measureLocation }) =>  {
    const calNumScore = Math.round(valueScore / 20);
    const textLabel = `${ calNumScore }/5`;
    const colorclass = (val) => {
        switch (true) {
            case (val === 5):
                return 'green-400';
            case (val === 4):
                return 'green-100';
            case (val === 3):
                return 'gold-400';
            case (val === 2):
                return 'orange-300';
            case (val <= 1):
                return 'danger-200';
        }
    };

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
