import React from 'react';
import { cleanup } from '@testing-library/react';
import { ExpandedRow } from './ExpandedRow';
import renderer from 'react-test-renderer';
import { TextList } from '@patternfly/react-core';

describe('ExpandedRow component', () => {
    afterEach(cleanup);

    it ('matches snapshot', ()=>{
        const propValues = {
            inventoryId: 'fd480a4c-952b-4675-ba02-3370bd08a5ee',
            cloudProvider: 'aws',
            instanceType: 't2.micro',
            idlingTime: '1.03'
        };

        const component = renderer.create(<ExpandedRow { ...propValues }/>);
        expect(component.toJSON()).toMatchSnapshot();
        const expandedRowInstance = component.root;
        expect(expandedRowInstance.findByType(TextList).props.id).toBe(propValues.inventoryId);
    });
});
