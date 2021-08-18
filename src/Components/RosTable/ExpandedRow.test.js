import React from 'react';
import { cleanup } from '@testing-library/react';
import { ExpandedRow } from './ExpandedRow';
import renderer from 'react-test-renderer';

afterEach(cleanup);

it ('matches snapshot', ()=>{
    const propValues = {
        inventoryId: 'fd480a4c-952b-4675-ba02-3370bd08a5ee',
        cloudProvider: 'aws',
        instanceType: 't2.micro',
        idlingTime: '1.03',
        ioWait: '0.10'
    };

    const component = renderer.create(<ExpandedRow { ...propValues }/>);
    expect(component.toJSON()).toMatchSnapshot();
});
