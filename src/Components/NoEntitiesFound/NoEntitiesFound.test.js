import React from 'react';
import renderer from 'react-test-renderer';
import NoEntitiesFound from './NoEntitiesFound';

describe('NoEntitiesFound', () => {
    it('should render correctly when there are no records', () => {
        const wrapper = renderer.create(<NoEntitiesFound />).toJSON();
        expect(wrapper).toMatchSnapshot();
    });
});
