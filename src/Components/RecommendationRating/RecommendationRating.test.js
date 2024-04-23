import { describe } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import RecommendationRating from './RecommendationRating';
import '@testing-library/jest-dom';

describe('RecommendationRating tests', () => {
    it('expect to render when no feedback submitted', () => {
        // render
        const propValues = {
            system: {
                inventoryId: 'fd480a4c-952b-4675-ba02-3370bd08a5ef',
                rating: 0
            }
        };
        render(<RecommendationRating { ...propValues }/>);

        // query
        const thumbsUpButton = screen.getByRole('button', { name: 'thumbs-up' });
        const thumbsDownButton = screen.getByRole('button', { name: 'thumbs-down' });

        // assert
        expect(thumbsUpButton).toBeVisible();
        expect(thumbsDownButton).toBeVisible();
    });

    it('expect to render with positive feedback', () => {
        // render
        const propValues = {
            system: {
                inventoryId: 'fd480a4c-952b-4675-ba02-3370bd08a5ef',
                rating: 1
            }
        };
        render(<RecommendationRating { ...propValues }/>);

        // query & interact
        const thumbsUpButton = screen.getByRole('button', { name: 'thumbs-up' });
        const thumbsUpPositiveImg = screen.getByTestId('thumbs-up-positive');

        // assert
        expect(thumbsUpButton).toBeVisible();
        expect(thumbsUpPositiveImg).toHaveClass('pf-v5-svg like');
    });

    it('expect to render with negative feedback', () => {
        // render
        const propValues = {
            system: {
                inventoryId: 'fd480a4c-952b-4675-ba02-3370bd08a5ef',
                rating: -1
            }
        };
        render(<RecommendationRating { ...propValues }/>);

        // query & interact
        const thumbsDownButton = screen.getByRole('button', { name: 'thumbs-down' });
        const thumbsDownNegativeImg = screen.getByTestId('thumbs-down-negative');

        // assert
        expect(thumbsDownButton).toBeVisible();
        expect(thumbsDownNegativeImg).toHaveClass('pf-v5-svg dislike');
    });
});
