import React from 'react';
import { cleanup } from '@testing-library/react';
import RecommendationsTable from './RecommendationsTable';
import renderer from 'react-test-renderer';

describe('RecommendationsTable component', () => {
    afterEach(cleanup);

    it ('matches snapshot when psi is disabled', ()=>{
        const propValues = {
            recommendations: [{
                ruleId: 'cloud_instance_ros_evaluation|CONSUMPTION_MODEL',
                description: 'This is test rule description.',
                reason: 'This may be caused due to inappropriate consumption model.',
                resolution: 'Please verify this instance.',
                condition: ''
            }],
            psiEnabled: false
        };

        const component = renderer.create(<RecommendationsTable { ...propValues }/>);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it ('matches snapshot when psi is enabled', ()=>{
        const propValues = {
            recommendations: [{
                ruleId: 'cloud_instance_ros_evaluation|CONSUMPTION_MODEL',
                description: 'This is test rule description.',
                reason: 'This may be caused due to inappropriate consumption model.',
                resolution: 'Please verify this instance.',
                condition: ''
            }],
            psiEnabled: true
        };

        const component = renderer.create(<RecommendationsTable { ...propValues }/>);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it ('matches snapshot where there is no suggestions', ()=>{
        const propValues = {
            recommendations: [],
            psiEnabled: false
        };

        const component = renderer.create(<RecommendationsTable { ...propValues }/>);
        expect(component.toJSON()).toMatchSnapshot();
    });
});
