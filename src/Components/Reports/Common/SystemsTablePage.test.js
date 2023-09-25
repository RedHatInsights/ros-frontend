import React from 'react';
import renderer from 'react-test-renderer';
import { SystemsTablePage } from './SystemsTablePage';

describe('Systems Table Page Component', () => {

    it('should matches snapshot for systems table page and renders correctly', () => {

        const tableProps = {
            data: [
                ['iqe-ros-bb519f81', 'RHEL 8.4', '90%', '80%', '0.314', '2', 'Undersized'],
                ['iqe-ros-bb519f81', 'RHEL 8.4', '90%', '80%', '0.314', '2', 'Under pressure'],
                ['iqe-ros-bb519f81', 'RHEL 8.4', 'N/A', 'N/A', 'N/A', '2', 'Waiting for data']
            ],
            page: 1
        };

        const component = renderer.create(<SystemsTablePage {...tableProps} />).toJSON();

        expect(component).toMatchSnapshot();

    });

});
