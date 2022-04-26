import { generateFilterText, formatData, responseToCSVData, responseToJSONData, formatExecutiveReportData } from './Util';
import { executiveReponseTestData, sysResponseTestData } from './UtilTestData';

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
    it('should generate array of data in the format required to generate PDF', () => {
        const expectedSystemsRowsData = [
            ['ip-172-31-28-69.ec2.internal', 'RHEL 8.4', '90%', '97%', '0.314', '1', 'Undersized', '29 Mar 2022 00:00 UTC'],
            ['ros-system.internal', 'RHEL 8.4', '90%', '97%', '0.314', '1', 'Undersized', '30 Mar 2022 00:01 UTC']
        ];

        const actualSystemsRowsData = formatData(sysResponseTestData, 'pdf');

        expect(actualSystemsRowsData).toEqual(expectedSystemsRowsData);

    });

    it('should generate array of data (with 0%) in the format required to generate PDF', () => {
        const expectedSystemsRowsData = [
            ['ip-172-31-28-69.ec2.internal', 'RHEL 8.4', '0%', '0%', '0.314', '1', 'Undersized', '29 Mar 2022 00:00 UTC'],
            ['ros-system.internal', 'RHEL 8.4', '90%', '97%', '0.314', '1', 'Undersized', '30 Mar 2022 00:01 UTC']
        ];

        sysResponseTestData[0].performance_utilization.cpu = 0;
        sysResponseTestData[0].performance_utilization.memory = 0;

        const actualSystemsRowsData = formatData(sysResponseTestData, 'pdf');

        expect(actualSystemsRowsData).toEqual(expectedSystemsRowsData);

    });

    it('should generate array of data (handling null values) in the format required to generate PDF', () => {
        const expectedSystemsRowsData = [
            ['ip-172-31-28-69.ec2.internal', 'RHEL 8.4', 'N/A', 'N/A', '0.314', 'N/A', 'Undersized', '29 Mar 2022 00:00 UTC'],
            ['ros-system.internal', 'RHEL 8.4', '90%', '97%', '0.314', '1', 'Undersized', '30 Mar 2022 00:01 UTC']
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
        const expectedSystemsRowsData = `display_name,os,performance_utilization.cpu,performance_utilization.memory,performance_utilization.max_io,number_of_suggestions,state,cloud_provider,instance_type,idling_time,report_date\r\nip-172-31-28-69.ec2.internal,RHEL 8.4,90%,97%,0.314,1,Undersized,aws,t2.micro,19.70%,29 Mar 2022 00:00 UTC\r\nros-system.internal,RHEL 8.4,90%,97%,0.314,1,Undersized,aws,t2.micro,19.70%,30 Mar 2022 00:01 UTC`;

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
        const expectedSystemsRowsData = '[{"display_name":"ip-172-31-28-69.ec2.internal","os":"RHEL 8.4","performance_utilization.cpu":"90%","performance_utilization.memory":"97%","performance_utilization.max_io":"0.314","number_of_suggestions":"1","state":"Undersized","cloud_provider":"aws","instance_type":"t2.micro","idling_time":"19.70%","report_date":"29 Mar 2022 00:00 UTC"}]';

        sysResponseTestData[0].number_of_suggestions = 1;  /* eslint-disable-line camelcase */
        sysResponseTestData[0].performance_utilization.cpu = 90;
        sysResponseTestData[0].performance_utilization.memory = 97;

        const sysResponseJSONData = sysResponseTestData.slice(0, 1);

        const actualSystemsRowsData = responseToJSONData(sysResponseJSONData);

        expect(actualSystemsRowsData).toEqual(expectedSystemsRowsData);
    });
});

describe('formatExecutiveReportData', () => {
    it('should format the data for generating executive PDF report', () => {
        const expectedStateChartData = [
            { x: 'Under pressure', y: 5 },
            { x: 'Undersized', y: 7 },
            { x: 'Oversized', y: 8 },
            { x: 'Waiting for data', y: 5 },
            { x: 'Idling', y: 5 }
        ];

        const expectedStateTableData = [
            ['# of systems'],
            ['0 (5% of total)'],
            ['1 (7% of total)'],
            ['7 (8% of total)'],
            ['8 (5% of total)'],
            ['8 (5% of total)']
        ];
        const expectedConditionsChartData = [
            { x: 'CPU', y: 20 },
            { x: 'Disk IO', y: 20 },
            { x: 'RAM', y: 20 }
        ];
        const expectedConditionsTableData = [
            ['# of Occurrences'],
            ['23'],
            ['23'],
            ['23']
        ];

        const expectedIoOccurances = [
            ['Under pressure', '10'],
            ['Undersized', '10']
        ];

        const expectedRAMOccurances = [
            ['Under pressure', '10'],
            ['Undersized', '10']
        ] ;

        const expectedCPUOccurances = [
            ['Under pressure', '10'],
            ['Undersized', 'N/A']
        ] ;

        const actualFormattedData = formatExecutiveReportData(executiveReponseTestData);

        const { stateChartData, stateTableData, conditionsChartData, conditionsTableData, condtionsInfo } =  actualFormattedData;
        expect(stateChartData).toEqual(expectedStateChartData);
        expect(stateTableData).toEqual(expectedStateTableData);
        expect(conditionsChartData).toEqual(expectedConditionsChartData);
        expect(conditionsTableData).toEqual(expectedConditionsTableData);
        expect(condtionsInfo.io.occurances).toEqual(expectedIoOccurances);
        expect(condtionsInfo.ram.occurances).toEqual(expectedRAMOccurances);
        expect(condtionsInfo.cpu.occurances).toEqual(expectedCPUOccurances);
    });
});
