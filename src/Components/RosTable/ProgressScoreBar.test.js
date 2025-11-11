import { describe } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProgressScoreBar } from './ProgressScoreBar';

describe('ProgressScoreBar component tests', () => {
    it('expect to render with blue-300 class with 40%', () => {

        // render
        render(<ProgressScoreBar measureLocation='outside' eleId='345' utilizedValue={40} />);

        // query
        const progressScoreBar = screen.getByTestId('progress-score-bar');
        const progressText40 = screen.getByText('40%');

        // assert
        expect(progressScoreBar).toBeVisible();
        expect(progressScoreBar).toHaveClass('pf-v6-c-progress blue-300');
        expect(progressText40).toBeVisible();

    });

    it('expect to render with blue-300 class with 90%', () => {

        // render
        render(<ProgressScoreBar measureLocation='outside' utilizedValue={90} />);

        // query
        const progressScoreBar = screen.getByTestId('progress-score-bar');
        const progressText90 = screen.getByText('90%');

        // assert
        expect(progressScoreBar).toBeVisible();
        expect(progressScoreBar).toHaveClass('pf-v6-c-progress blue-300');
        expect(progressText90).toBeVisible();

    });
});

