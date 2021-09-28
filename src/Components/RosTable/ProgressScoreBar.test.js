import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { ProgressScoreBar } from './ProgressScoreBar';
import renderer from 'react-test-renderer';
import { Progress } from '@patternfly/react-core';
import '@testing-library/jest-dom/extend-expect';

describe('ProgressScoreBar component', () => {
    afterEach(cleanup);

    it('expect to render bar with danger-200', () => {
        const component = renderer.create(
            <ProgressScoreBar
                measureLocation='outside'
                valueScore={1}
                eleId='123'
                utilizedValue={20} />
        );
        expect(component.toJSON()).toMatchSnapshot();
        const progressInstance = component.root.findByType(Progress);
        expect(progressInstance.props.className.includes('danger-200')).toBe(true);
        expect(progressInstance.props.value).toBe(20);
    });

    it('expect to render with orange-300 class', () => {
        const { container } = render(
            <ProgressScoreBar
                measureLocation='outside'
                valueScore={2}
                eleId='345'
                utilizedValue={40} />
        );
        expect(container.getElementsByClassName('pf-c-progress').length).toBe(1);
        expect(container.firstChild).toHaveClass('orange-300');
        expect(container.firstChild.classList.contains('orange-300')).toBe(true);
    });
});
