// import { test } from '@jest/globals';

// test.todo('RecommendationsTable component tests');

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecommendationsTable from './RecommendationsTable';

describe('RecommendationsTable component', () => {

    it ('matches snapshot when psi is disabled', ()=>{

        // render & query
        const propValues = {
            /* eslint-disable camelcase */
            recommendations: [{
                rule_id: 'cloud_instance_ros_evaluation|CONSUMPTION_MODEL',
                description: 'This is test rule description.',
                reason: 'This may be caused due to inappropriate consumption model.',
                resolution: 'Please verify this instance.',
                condition: '',
                psi_enabled: false
            }]
        };
        const { asFragment } = render(<RecommendationsTable { ...propValues }/>);

        // assert
        expect(asFragment()).toMatchSnapshot();
    });

    it ('matches snapshot when psi is enabled', ()=>{

        // render & query
        const propValues = {
            /* eslint-disable camelcase */
            recommendations: [{
                rule_id: 'cloud_instance_ros_evaluation|CONSUMPTION_MODEL',
                description: 'This is test rule description.',
                reason: 'This may be caused due to inappropriate consumption model.',
                resolution: 'Please verify this instance.',
                condition: '',
                psi_enabled: true
            }]
        };
        const { asFragment } = render(<RecommendationsTable { ...propValues }/>);

        // assert
        expect(asFragment()).toMatchSnapshot();
    });

    it ('matches snapshot where there is no suggestions', ()=>{

        // render & query
        const propValues = {
            /* eslint-disable camelcase */
            recommendations: [{
                psi_enabled: false
            }]
        };
        const { asFragment } = render(<RecommendationsTable { ...propValues }/>);

        //assert
        expect(asFragment()).toMatchSnapshot();
    });
});
