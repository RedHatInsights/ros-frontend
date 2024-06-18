import { describe } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NoEntitiesFound from './NoEntitiesFound';

describe('NoEntitiesFound tests', () => {
    it('should render correctly when there are no records', () => {

        // render
        render(<NoEntitiesFound />);

        // query

        const noInstanceText = screen.getByText('No suggested instance types found');
        const gettingStartedButton = screen.getByRole('link');

        // assert
        expect(noInstanceText).toBeVisible();
        expect(gettingStartedButton).toBeVisible();

    });
});

