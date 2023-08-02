import { generateFilterText, formatData, responseToCSVData, responseToJSONData } from './Util';
import { sysResponseTestData } from './UtilTestData';

describe('Util generateFilterText method tests', () => {
    it('should generate filter text for name filter', () => {
        const expectedFilterText = `\nFilters applied\nName: ros-system\n`;
        const filters = {
            hostnameOrId: 'ros-system'
        };
        const actualFilterText = generateFilterText(filters);

        expect(actualFilterText).toBe(expectedFilterText);
    });

    it('should generate filter text for state filter', () => {
        const expectedFilterText = `\nFilters applied\nState: Undersized,Waiting for data,Oversized\n`;
        const filters = {
            stateFilter: ['Undersized', 'Waiting for data', 'Oversized']
        };
        const actualFilterText = generateFilterText(filters);

        expect(actualFilterText).toBe(expectedFilterText);
    });

    it('should generate filter text for name & state filter', () => {
        const expectedFilterText = `\nFilters applied\nName: ros-system\nState: Undersized,Waiting for data,Oversized\n`;
        const filters = {
            hostnameOrId: 'ros-system',
            stateFilter: ['Undersized', 'Waiting for data', 'Oversized']
        };
        const actualFilterText = generateFilterText(filters);

        expect(actualFilterText).toBe(expectedFilterText);
    });

    it('should generate filter text for name, state & os filter', () => {
        let expectedFilterText = `\nFilters applied\nName: ros-system\nState: Undersized,Waiting for data,Oversized\n`;
        expectedFilterText = expectedFilterText + `Operating System: RHEL 7.2,RHEL 7.7,RHEL 8.0\n`;
        const filters = {
            hostnameOrId: 'ros-system',
            stateFilter: ['Undersized', 'Waiting for data', 'Oversized'],
            osFilter: ['RHEL 7.7', 'RHEL 8.0', 'RHEL 7.2']
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

describe('Util formatData method tests', () => {

    it('should format data (with 0%)', () => {
        // eslint-disable-next-line max-len
        const expectedSystemsRowsData = [{
            display_name: 'ip-172-31-28-69.ec2.internal', /* eslint-disable-line camelcase */
            os: 'RHEL 8.4',
            'performance_utilization.cpu': '0%',
            'performance_utilization.memory': '0%',
            'performance_utilization.max_io': '0.314',
            number_of_suggestions: '1', /* eslint-disable-line camelcase */
            state: 'Undersized', cloud_provider: 'aws', /* eslint-disable-line camelcase */
            instance_type: 't2.micro', /* eslint-disable-line camelcase */
            idling_time: '19.70%', /* eslint-disable-line camelcase */
            report_date: '29 Mar 2022 00:00 UTC', /* eslint-disable-line camelcase */
            groups: 'ros-for-OCP'
        },
        {
            display_name: 'ros-system.internal', /* eslint-disable-line camelcase */
            os: 'RHEL 8.4',
            'performance_utilization.cpu': '90%',
            'performance_utilization.memory': '97%',
            'performance_utilization.max_io': '0.314',
            number_of_suggestions: '1', /* eslint-disable-line camelcase */
            state: 'Undersized',
            cloud_provider: 'aws', /* eslint-disable-line camelcase */
            instance_type: 't2.micro', /* eslint-disable-line camelcase */
            idling_time: '19.70%', /* eslint-disable-line camelcase */
            report_date: '30 Mar 2022 00:01 UTC', /* eslint-disable-line camelcase */
            groups: 'N/A'
        }];

        sysResponseTestData[0].performance_utilization.cpu = 0;
        sysResponseTestData[0].performance_utilization.memory = 0;

        const actualSystemsRowsData = formatData(sysResponseTestData, 'json');

        expect(actualSystemsRowsData).toEqual(expectedSystemsRowsData);

    });

    it('should format data (handling null values)', () => {
        // eslint-disable-next-line max-len
        const expectedSystemsRowsData = [{
            display_name: 'ip-172-31-28-69.ec2.internal', /* eslint-disable-line camelcase */
            os: 'RHEL 8.4',
            'performance_utilization.cpu': 'N/A',
            'performance_utilization.memory': 'N/A',
            'performance_utilization.max_io': '0.314',
            number_of_suggestions: 'N/A', /* eslint-disable-line camelcase */
            state: 'Undersized',
            cloud_provider: 'aws', /* eslint-disable-line camelcase */
            instance_type: 't2.micro', /* eslint-disable-line camelcase */
            idling_time: '19.70%', /* eslint-disable-line camelcase */
            report_date: '29 Mar 2022 00:00 UTC', /* eslint-disable-line camelcase */
            groups: 'ros-for-OCP'
        },
        {
            display_name: 'ros-system.internal', /* eslint-disable-line camelcase */
            os: 'RHEL 8.4',
            'performance_utilization.cpu': '90%',
            'performance_utilization.memory': '97%',
            'performance_utilization.max_io': '0.314',
            number_of_suggestions: '1', /* eslint-disable-line camelcase */
            state: 'Undersized',
            cloud_provider: 'aws', /* eslint-disable-line camelcase */
            instance_type: 't2.micro', /* eslint-disable-line camelcase */
            idling_time: '19.70%', /* eslint-disable-line camelcase */
            report_date: '30 Mar 2022 00:01 UTC', /* eslint-disable-line camelcase */
            groups: 'N/A'
        }];

        sysResponseTestData[0].number_of_suggestions = null;  /* eslint-disable-line camelcase */
        sysResponseTestData[0].performance_utilization.cpu = null;
        sysResponseTestData[0].performance_utilization.memory = null;

        const actualSystemsRowsData = formatData(sysResponseTestData, 'json');

        expect(actualSystemsRowsData).toEqual(expectedSystemsRowsData);

    });
});

describe('Util responseToCSVData test', () => {
    it('should format the data into CSV format', () => {
        // eslint-disable-next-line max-len
        const expectedSystemsRowsData = `display_name,os,performance_utilization.cpu,performance_utilization.memory,performance_utilization.max_io,number_of_suggestions,state,cloud_provider,instance_type,idling_time,report_date,groups\r\nip-172-31-28-69.ec2.internal,RHEL 8.4,90%,97%,0.314,1,Undersized,aws,t2.micro,19.70%,29 Mar 2022 00:00 UTC,ros-for-OCP\r\nros-system.internal,RHEL 8.4,90%,97%,0.314,1,Undersized,aws,t2.micro,19.70%,30 Mar 2022 00:01 UTC,N/A`;

        sysResponseTestData[0].number_of_suggestions = 1;  /* eslint-disable-line camelcase */
        sysResponseTestData[0].performance_utilization.cpu = 90;
        sysResponseTestData[0].performance_utilization.memory = 97;

        const actualSystemsRowsData = responseToCSVData(sysResponseTestData);

        expect(actualSystemsRowsData).toEqual(expectedSystemsRowsData);
    });
});

describe('Util responseToJSONData test', () => {
    it('should format the data into JSON string format ', () => {
        // eslint-disable-next-line max-len
        const expectedSystemsRowsData = '[{"display_name":"ip-172-31-28-69.ec2.internal","os":"RHEL 8.4","performance_utilization.cpu":"90%","performance_utilization.memory":"97%","performance_utilization.max_io":"0.314","number_of_suggestions":"1","state":"Undersized","cloud_provider":"aws","instance_type":"t2.micro","idling_time":"19.70%","report_date":"29 Mar 2022 00:00 UTC","groups":"ros-for-OCP"}]';

        sysResponseTestData[0].number_of_suggestions = 1;  /* eslint-disable-line camelcase */
        sysResponseTestData[0].performance_utilization.cpu = 90;
        sysResponseTestData[0].performance_utilization.memory = 97;

        const sysResponseJSONData = sysResponseTestData.slice(0, 1);

        const actualSystemsRowsData = responseToJSONData(sysResponseJSONData);

        expect(actualSystemsRowsData).toEqual(expectedSystemsRowsData);
    });
});

