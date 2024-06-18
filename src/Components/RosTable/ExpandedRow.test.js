import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ExpandedRow } from './ExpandedRow';

describe('ExpandedRow component', () => {

    it ('matches snapshot when all values are available', ()=>{

        // render & query
        const propValues = {
            inventoryId: 'fd480a4c-952b-4675-ba02-3370bd08a5ee',
            cloudProvider: 'aws',
            instanceType: 't2.micro',
            idlingTime: '1.03'
        };

        const { asFragment } = render(<ExpandedRow { ...propValues }/>);

        // assert
        expect(asFragment()).toMatchSnapshot();

    });

    it ('matches snapshot when values are null', ()=>{

        // render & query
        const propValues = {
            inventoryId: 'fd480a4c-952b-4675-ba02-3370bd08a5ee',
            cloudProvider: null,
            instanceType: null,
            idlingTime: null
        };

        const { asFragment } = render(<ExpandedRow { ...propValues }/>);

        // assert
        expect(asFragment()).toMatchSnapshot();

    });
});
