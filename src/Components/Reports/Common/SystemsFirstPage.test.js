import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SystemsFirstPage } from './SystemsFirstPage';

jest.mock('@redhat-cloud-services/frontend-components-pdf-generator', () => ({
    __esModule: true,
    Section: jest.fn(({ children, ...props }) => <div {...props}>{children}</div>),
    Column: jest.fn(({ children, ...props }) => <div {...props}>{children}</div>),
    Table: jest.fn(() => <div>Table inside PDF</div>)
}));

describe('Systems First Page Component', () => {

    it('should matches snapshot for systems first page and renders correctly', () => {

        // render & query
        const firstPageProps = {
            data: [
                ['iqe-ros-bb519f81', 'N/A', 'RHEL 8.4', '90%', '80%', '0.314', '2', 'Undersized'],
                ['iqe-ros-bb519f81', 'team-ros', 'RHEL 8.4', '90%', '80%', '0.314', '2', 'Under pressure'],
                ['iqe-ros-bb519f81', 'N/A', 'RHEL 8.4', 'N/A', 'N/A', 'N/A', '2', 'Waiting for data']
            ],
            totalSystems: 3,
            filterText: `Filters applied\nState: Undersized,Under pressure,Waiting for data\nName: iqe`
        };

        const { asFragment } = render(<SystemsFirstPage {...firstPageProps} />);

        // assert
        expect(asFragment()).toMatchSnapshot();

    });

    it('should matches snapshot for systems first page and renders correctly with 1 system', () => {

        // render & query
        const firstPageProps = {
            data: [
                ['iqe-ros-bb519f81', 'team-ros', 'RHEL 8.4', '90%', '80%', '0.314', '2', 'Undersized']
            ],
            totalSystems: 1,
            filterText: `Filters applied\nState: Undersized\nName: iqe\nGroups:team-ros`
        };

        const { asFragment } = render(<SystemsFirstPage {...firstPageProps} />);

        // assert
        expect(asFragment()).toMatchSnapshot();

    });

});

