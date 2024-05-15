import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SystemsTablePage } from './SystemsTablePage';

describe('Systems Table Page Component', () => {

    it('should matches snapshot for systems table page and renders correctly', () => {

        // render & query
        const tableProps = {
            data: [
                ['iqe-ros-bb519f81', 'RHEL 8.4', '90%', '80%', '0.314', '2', 'Undersized', '2022-03-29'],
                ['iqe-ros-bb519f81', 'RHEL 8.4', '90%', '80%', '0.314', '2', 'Under pressure', '2022-03-30'],
                ['iqe-ros-bb519f81', 'RHEL 8.4', 'N/A', 'N/A', 'N/A', '2', 'Waiting for data', '2022-03-31']
            ],
            page: 1
        };

        const { asFragment } = render(<SystemsTablePage {...tableProps} />);

        // assert
        expect(asFragment()).toMatchSnapshot();

    });

});
