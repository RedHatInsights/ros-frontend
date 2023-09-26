import React from 'react';
import renderer from 'react-test-renderer';
import { SystemsFirstPage } from './SystemsFirstPage';

describe('Systems First Page Component', () => {

    it('should matches snapshot for systems first page and renders correctly', () => {

        const firstPageProps = {
            data: [
                ['iqe-ros-bb519f81', 'N/A', 'RHEL 8.4', '90%', '80%', '0.314', '2', 'Undersized'],
                ['iqe-ros-bb519f81', 'team-ros', 'RHEL 8.4', '90%', '80%', '0.314', '2', 'Under pressure'],
                ['iqe-ros-bb519f81', 'N/A', 'RHEL 8.4', 'N/A', 'N/A', 'N/A', '2', 'Waiting for data']
            ],
            totalSystems: 3,
            filterText: `Filters applied\nState: Undersized,Under pressure,Waiting for data\nName: iqe`
        };

        const component = renderer.create(<SystemsFirstPage {...firstPageProps} />).toJSON();

        expect(component).toMatchSnapshot();

    });

    it('should matches snapshot for systems first page and renders correctly with 1 system', () => {

        const firstPageProps = {
            data: [
                ['iqe-ros-bb519f81', 'team-ros', 'RHEL 8.4', '90%', '80%', '0.314', '2', 'Undersized']
            ],
            totalSystems: 1,
            filterText: `Filters applied\nState: Undersized\nName: iqe\nGroups:team-ros`
        };

        const component = renderer.create(<SystemsFirstPage {...firstPageProps} />).toJSON();

        expect(component).toMatchSnapshot();

    });

});
