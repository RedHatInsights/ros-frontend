
/* eslint-disable camelcase */

import { formatHistoricalData } from './Util';
import { expectedChartData_45, expectedChartData_7, testHistoryResponseData_45, testHistoryResponseData_7 } from './UtilTestData';

describe('formatHistoricalData method', () => {

    beforeAll(() => {
        jest.useFakeTimers('modern');

        jest.setSystemTime(new Date('2022-04-24T00:00:00.000Z').getTime());
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should format response into historical chart data - Last 7 days', () =>{

        const actualChartData = formatHistoricalData(testHistoryResponseData_7, 7);

        expect(actualChartData).toEqual(expectedChartData_7);

    });

    it('should format response into historical chart data - Last 45 days', () =>{

        const actualChartData = formatHistoricalData(testHistoryResponseData_45, 49);

        expect(actualChartData).toEqual(expectedChartData_45);

    });

});
