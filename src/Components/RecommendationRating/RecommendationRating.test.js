import React from 'react';
import { cleanup, render } from '@testing-library/react';
import RecommendationRating from './RecommendationRating';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

it ('matches snapshot with positive feedback', ()=>{
    const propValues = {
        system: {
            inventoryId: 'fd480a4c-952b-4675-ba02-3370bd08a5ef',
            rating: 1
        }
    };
    const component = renderer.create(<RecommendationRating { ...propValues }/>).toJSON();
    expect(component).toMatchSnapshot();
});

it ('matches snapshot with negative feedback', ()=>{
    const propValues = {
        system: {
            inventoryId: 'fd480a4c-952b-4675-ba02-3370bd08a5ef',
            rating: -1
        }
    };
    const component = renderer.create(<RecommendationRating { ...propValues }/>).toJSON();
    expect(component).toMatchSnapshot();
});

it('expect to render with negative feedback', () => {
    const propValues = {
        system: {
            inventoryId: 'fd480a4c-952b-4675-ba02-3370bd08a5ef',
            rating: -1
        }
    };
    const { container } = render(<RecommendationRating { ...propValues }/>);
    expect(container.firstChild).toHaveClass('ratingSpanOverride');
    expect(container.getElementsByClassName('dislike').length).toBe(1);
});

it('expect to render with positive feedback', () => {
    const propValues = {
        system: {
            inventoryId: 'fd480a4c-952b-4675-ba02-3370bd08a5ef',
            rating: 1
        }
    };
    const { container } = render(<RecommendationRating { ...propValues }/>);
    expect(container.getElementsByClassName('like').length).toBe(1);
});

it('expect to render when no feedback submitted', () => {
    const propValues = {
        system: {
            inventoryId: 'fd480a4c-952b-4675-ba02-3370bd08a5ef',
            rating: 0
        }
    };
    const { container } = render(<RecommendationRating { ...propValues }/>);
    expect(container.getElementsByClassName('like').length).toBe(0);
    expect(container.getElementsByClassName('dislike').length).toBe(0);
});
