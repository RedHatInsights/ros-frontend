
/* eslint-disable camelcase */

import { formatHistoricalData } from './Util';
import { expectedChartData_45, expectedChartData_7, testHistoryResponseData_45, testHistoryResponseData_7 } from './UtilTestData';

Date.now = jest.fn(() => new Date('2022-04-25T14:11:14.466Z'));

describe('formatHistoricalData method', () => {

    it('should format response into historical chart data - Last 7 days', () =>{

        const actualChartData = formatHistoricalData(testHistoryResponseData_7, 7);

        expect(actualChartData).toEqual(expectedChartData_7);

    });

    it('should format response into historical chart data - Last 45 days', () =>{

        const actualChartData = formatHistoricalData(testHistoryResponseData_45, 49);

        expect(actualChartData).toEqual(expectedChartData_45);

    });

});
