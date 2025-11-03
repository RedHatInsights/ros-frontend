import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@patternfly/react-core';
import { OutlinedThumbsUpIcon } from '@patternfly/react-icons';
import { OutlinedThumbsDownIcon } from '@patternfly/react-icons';
import { ThumbsUpIcon } from '@patternfly/react-icons';
import { ThumbsDownIcon } from '@patternfly/react-icons';

import './RecommendationRating.scss';
import {
    ROS_API_ROOT,
    RECOMMENDATION_RATING_API,
    NEUTRAL_FEEDBACK,
    POSITIVE_FEEDBACK,
    NEGATIVE_FEEDBACK  } from '../../constants';

const RecommendationRating = ({ system }) => {
    const [rating, setRating] = useState(system.rating);
    const [submitted, setSubmitted] = useState(false);
    const updateRecommendationRating = async (newRating) => {
        const calculatedRating = rating === newRating ? NEUTRAL_FEEDBACK : newRating;
        try {

            // POST request using fetch with error handling
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    inventory_id: system.inventoryId, /* eslint-disable-line camelcase */
                    rating: calculatedRating
                })
            };

            await fetch(`${ROS_API_ROOT}${RECOMMENDATION_RATING_API}`, requestOptions);
            setRating(calculatedRating);
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 3000);
        } catch (error) {
            console.error(error); // eslint-disable-line no-console
        }
    };

    return <span className='ratingSpanOverride'>
        Is this suggestion helpful?
        <Button
            variant="plain"
            aria-label="thumbs-up"
            onClick={() => updateRecommendationRating(POSITIVE_FEEDBACK)}
            ouiaId="thumbsUp"
            icon={rating === POSITIVE_FEEDBACK ? <ThumbsUpIcon data-testid='thumbs-up-positive' className='like' size='sm' /> :
                <OutlinedThumbsUpIcon size='md' />}
        />
        <Button
            variant="plain"
            aria-label="thumbs-down"
            onClick={() => updateRecommendationRating(NEGATIVE_FEEDBACK)}
            ouiaId="thumbsDown"
            icon={rating === NEGATIVE_FEEDBACK ? <ThumbsDownIcon data-testid='thumbs-down-negative' className='dislike' size='sm' /> :
                <OutlinedThumbsDownIcon size='sm' />}
        />
        {submitted && 'Thank you for your feedback!'}
    </span>;
};

RecommendationRating.propTypes = {
    system: PropTypes.object
};

export default RecommendationRating;
