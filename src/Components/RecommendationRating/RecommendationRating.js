import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@patternfly/react-core';
import { OutlinedThumbsUpIcon } from '@patternfly/react-icons';
import { OutlinedThumbsDownIcon } from '@patternfly/react-icons';
import { ThumbsUpIcon } from '@patternfly/react-icons';
import { ThumbsDownIcon } from '@patternfly/react-icons';

import './RecommendationRating.scss';
import { ROS_API_ROOT, RECOMMENDATION_RATING_API } from '../../constants';

const RecommendationRating = ({ system }) => {
    const [rating, setRating] = useState(system.rating);
    const [submitted, setSubmitted] = useState(false);
    const [thankYou, setThankYou] = useState('Thank you for your feedback!');
    const updateRecommendationRating = async (newRating) => {
        const calculatedRating = rating === newRating ? 0 : newRating;
        let url = new URL(ROS_API_ROOT + RECOMMENDATION_RATING_API,  window.location.origin);
        try {

            // POST request using fetch with error handling
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    inventory_id: system.inventory_id,  // eslint-disable-line camelcase
                    rating: calculatedRating
                })
            };

            await fetch(url, requestOptions);
            setRating(calculatedRating);
            setSubmitted(true);
            setTimeout(() => setThankYou(''), 3000);
        } catch (error) {
            console.error(error); // eslint-disable-line no-console
        }
    };

    return <span className='ratingSpanOverride'>
        {'Is this recommendation helpful?'}
        <Button variant="plain" aria-label="thumbs-up" onClick={() => updateRecommendationRating(1)}
            ouiaId="thumbsUp">
            {rating === 1 ? <ThumbsUpIcon className='like' size='sm' /> :
                <OutlinedThumbsUpIcon size='sm' />}
        </Button>
        <Button variant="plain" aria-label="thumbs-down" onClick={() => updateRecommendationRating(-1)}
            ouiaId="thumbsDown">
            {rating === -1 ? <ThumbsDownIcon className='dislike' size='sm' /> :
                <OutlinedThumbsDownIcon size='sm' />}
        </Button>
        {submitted && thankYou}
    </span>;
};

RecommendationRating.propTypes = {
    system: PropTypes.object
};

export default RecommendationRating;
