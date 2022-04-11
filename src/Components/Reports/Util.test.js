import { generateFilterText, formatData, responseToCSVData, responseToJSONData, formatLastReported } from './Util';
import { sysResponseTestData } from './UtilTestData';

Date.now = jest.fn(() => new Date('2022-03-30T12:33:37.000Z'));

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
        const expectedFilterText = `\nFilters applied\nState: Undersized,Waiting for data,Oversized\n`;
        const filters = {
            stateFilter: ['Undersized', 'Waiting for data', 'Oversized']
        };
        const actualFilterText = generateFilterText(filters);

        expect(actualFilterText).toBe(expectedFilterText);
    });

    it('should generate filter text for name & state filter', () => {
        const expectedFilterText = `\nFilters applied\nState: Undersized,Waiting for data,Oversized\nName: ros-system`;
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

describe('Util formatData method tests', () => {
    it('should generate array of data in the format required to generate PDF', () => {
        const expectedSystemsRowsData = [
            ['ip-172-31-28-69.ec2.internal', 'RHEL 8.4', '90%', '97%', '0.314', '1', 'Undersized', '2 days ago'],
            ['ros-system.internal', 'RHEL 8.4', '90%', '97%', '0.314', '1', 'Undersized', '32 minutes ago']
        ];

        const actualSystemsRowsData = formatData(sysResponseTestData, 'pdf');

        expect(actualSystemsRowsData).toEqual(expectedSystemsRowsData);

    });

    it('should generate array of data (with 0%) in the format required to generate PDF', () => {
        const expectedSystemsRowsData = [
            ['ip-172-31-28-69.ec2.internal', 'RHEL 8.4', '0%', '0%', '0.314', '1', 'Undersized', '2 days ago'],
            ['ros-system.internal', 'RHEL 8.4', '90%', '97%', '0.314', '1', 'Undersized', '32 minutes ago']
        ];

        sysResponseTestData[0].performance_utilization.cpu = 0;
        sysResponseTestData[0].performance_utilization.memory = 0;

        const actualSystemsRowsData = formatData(sysResponseTestData, 'pdf');

        expect(actualSystemsRowsData).toEqual(expectedSystemsRowsData);

    });

    it('should generate array of data (handling null values) in the format required to generate PDF', () => {
        const expectedSystemsRowsData = [
            ['ip-172-31-28-69.ec2.internal', 'RHEL 8.4', 'N/A', 'N/A', '0.314', 'N/A', 'Undersized', '2 days ago'],
            ['ros-system.internal', 'RHEL 8.4', '90%', '97%', '0.314', '1', 'Undersized', '32 minutes ago']
        ];

        sysResponseTestData[0].number_of_suggestions = null;  /* eslint-disable-line camelcase */
        sysResponseTestData[0].performance_utilization.cpu = null;
        sysResponseTestData[0].performance_utilization.memory = null;

        const actualSystemsRowsData = formatData(sysResponseTestData, 'pdf');

        expect(actualSystemsRowsData).toEqual(expectedSystemsRowsData);

    });
});

describe('Util responseToCSVData test', () => {
    it('should format the data into CSV format', () => {
        // eslint-disable-next-line max-len
        const expectedSystemsRowsData = `display_name,os,performance_utilization.cpu,performance_utilization.memory,performance_utilization.max_io,number_of_suggestions,state,cloud_provider,instance_type,idling_time,report_date\r\nip-172-31-28-69.ec2.internal,RHEL 8.4,90%,97%,0.314,1,Undersized,aws,t2.micro,19.70%,2 days ago\r\nros-system.internal,RHEL 8.4,90%,97%,0.314,1,Undersized,aws,t2.micro,19.70%,32 minutes ago`;

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
        const expectedSystemsRowsData = '[{"display_name":"ip-172-31-28-69.ec2.internal","os":"RHEL 8.4","performance_utilization.cpu":"90%","performance_utilization.memory":"97%","performance_utilization.max_io":"0.314","number_of_suggestions":"1","state":"Undersized","cloud_provider":"aws","instance_type":"t2.micro","idling_time":"19.70%","report_date":"2 days ago"}]';

        sysResponseTestData[0].number_of_suggestions = 1;  /* eslint-disable-line camelcase */
        sysResponseTestData[0].performance_utilization.cpu = 90;
        sysResponseTestData[0].performance_utilization.memory = 97;

        const sysResponseJSONData = sysResponseTestData.slice(0, 1);

        const actualSystemsRowsData = responseToJSONData(sysResponseJSONData);

        expect(actualSystemsRowsData).toEqual(expectedSystemsRowsData);
    });
});

describe('Util formatLastReported test', () => {
    it('should format the date into last reported format - 6 days ago', () => {
        const expectedLastReportedDate = '6 days ago';
        const actualLastReportedDate = formatLastReported('2022-03-25 00:00:00+00:00');
        expect(actualLastReportedDate).toEqual(expectedLastReportedDate);
    });

    it('should format the date into last reported format - 2 days ago', () => {
        const expectedLastReportedDate = '2 days ago';
        const actualLastReportedDate = formatLastReported('2022-03-29');
        expect(actualLastReportedDate).toEqual(expectedLastReportedDate);

    });

    it('should format the date into last reported format - 11 minutes ago', () => {
        const expectedLastReportedDate = '11 minutes ago';
        const actualLastReportedDate = formatLastReported('2022-03-30 12:23:00+00:00');
        expect(actualLastReportedDate).toEqual(expectedLastReportedDate);
    });
});

