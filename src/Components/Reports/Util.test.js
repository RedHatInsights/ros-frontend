import { generateFilterText, responseToPDFData } from './Util';

describe('Util generateFilterText method tests', () => {
    it('should generate filter text for name filter', () => {
        const expectedFilterText = `\nFilters applied\nName: ros-system`;
        const filters = {
            hostnameOrId: 'ros-system'
        };
        const actualFilterText = generateFilterText(filters);

        expect(actualFilterText).toBe(expectedFilterText);
    });

    it('should generate filter text for state filter', () => {
        const expectedFilterText = `\nFilters applied\nState: Undersized,Waiting for data,Oversized\t\t\t\t\t`;
        const filters = {
            stateFilter: ['Undersized', 'Waiting for data', 'Oversized']
        };
        const actualFilterText = generateFilterText(filters);

        expect(actualFilterText).toBe(expectedFilterText);
    });

    it('should generate filter text for name & state filter', () => {
        const expectedFilterText = `\nFilters applied\nState: Undersized,Waiting for data,Oversized\t\t\t\t\tName: ros-system`;
        const filters = {
            hostnameOrId: 'ros-system',
            stateFilter: ['Undersized', 'Waiting for data', 'Oversized']
        };
        const actualFilterText = generateFilterText(filters);

        expect(actualFilterText).toBe(expectedFilterText);
    });

    it('should generate empty filter string in case of no filters', () => {
        const expectedFilterText = '';
        const filters = {};
        const actualFilterText = generateFilterText(filters);

        expect(actualFilterText).toBe(expectedFilterText);
    });

    it('should generate empty filter string in case of no filters', () => {
        const expectedFilterText = '';
        const filters = {
            hostnameOrId: '',
            stateFilter: []
        };
        const actualFilterText = generateFilterText(filters);

        expect(actualFilterText).toBe(expectedFilterText);
    });

    it('should generate empty filter string in case of no filters', () => {
        const expectedFilterText = '';
        const filters = {
            hostnameOrId: undefined,
            stateFilter: []
        };
        const actualFilterText = generateFilterText(filters);

        expect(actualFilterText).toBe(expectedFilterText);
    });
});

describe('Util responseToPDFData method tests', () => {
    it('should generate array of data in the format required to generate PDF', () => {
        const expectedSystemsRowsData = [
            ['ip-172-31-28-69.ec2.internal', 'RHEL 8.4', '90%', '97%', '0.314', '1', 'Undersized', '03 Mar 2022 06:58 UTC'],
            ['ros-system.internal', 'RHEL 8.4', '90%', '97%', '0.314', '1', 'Undersized', '03 Mar 2022 06:58 UTC']
        ];

        const testData = [
            {
                fqdn: 'ip-172-31-28-69.ec2.internal',
                display_name: 'ip-172-31-28-69.ec2.internal', /* eslint-disable-line camelcase */
                inventory_id: 'cd96482e-1fcb-49b4-958d-06315da16b9a', /* eslint-disable-line camelcase */
                account: '6089719',
                number_of_suggestions: 1, /* eslint-disable-line camelcase */
                state: 'Undersized',
                performance_utilization: {  /* eslint-disable-line camelcase */
                    cpu: 90, memory: 97,
                    max_io: 0.314, io_all: { xvda: 0.314 }  /* eslint-disable-line camelcase */
                },
                cloud_provider: 'aws',  /* eslint-disable-line camelcase */
                instance_type: 't2.micro',  /* eslint-disable-line camelcase */
                idling_time: '19.70',  /* eslint-disable-line camelcase */
                os: 'RHEL 8.4'
            },
            {
                fqdn: 'ip-172-31-28-69.ec2.internal',
                display_name: 'ros-system.internal', /* eslint-disable-line camelcase */
                inventory_id: 'cd96482e-1fcb-49b4-958d-06315da16b9a', /* eslint-disable-line camelcase */
                account: '6089719',
                number_of_suggestions: 1, /* eslint-disable-line camelcase */
                state: 'Undersized',
                performance_utilization: {  /* eslint-disable-line camelcase */
                    cpu: 90, memory: 97,
                    max_io: 0.314, io_all: { xvda: 0.314 }  /* eslint-disable-line camelcase */
                },
                cloud_provider: 'aws',  /* eslint-disable-line camelcase */
                instance_type: 't2.micro',  /* eslint-disable-line camelcase */
                idling_time: '19.70',  /* eslint-disable-line camelcase */
                os: 'RHEL 8.4'
            }
        ];

        const actualSystemsRowsData = responseToPDFData(testData);

        expect(actualSystemsRowsData).toEqual(expectedSystemsRowsData);

    });
});
