import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { ProgressScoreBar } from './ProgressScoreBar';
import '@testing-library/jest-dom/extend-expect';

describe('ProgressScoreBar component', () => {
    afterEach(cleanup);

    it('expect to render with blue-200 class', () => {
        const { container } = render(
            <ProgressScoreBar
                measureLocation='outside'
                eleId='345'
                utilizedValue={40} />
        );
        expect(container.getElementsByClassName('pf-c-progress').length).toBe(1);
        expect(container.firstChild).toHaveClass('blue-200');
        expect(container.firstChild.classList.contains('blue-200')).toBe(true);
    });
});
