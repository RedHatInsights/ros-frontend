import { get } from 'lodash';
import { pdfRowKeys, percentageKeys, reportRowKeys, SYSTEMS_REPORT_FILE_NAME } from '../../constants';
import { dateStringByType } from '@redhat-cloud-services/frontend-components/DateFormat/helper';

export const formatData = (data, type) => {

    const systemsRowsData = [];
    const rowKeys = type === 'json' ?  reportRowKeys : pdfRowKeys;

    data.map((systemItem) => {
        let rowData = type === 'json' ? {} : [];

        rowKeys.map((rowKey) =>{
            let rowValue =  get(systemItem, rowKey, '');
            rowValue = (rowValue === null || rowValue === -1) ?  'N/A' : rowValue.toString();
            rowValue = (rowValue !== 'N/A' && percentageKeys.includes(rowKey)) ? `${rowValue}%` : rowValue;
            rowValue = (rowKey === 'report_date') ? dateStringByType('exact')(new Date(rowValue)) : rowValue;

            if (type === 'json') {
                rowData[rowKey] = rowValue;
            } else if (type === 'pdf') {
                rowData.push(rowValue);
            }
        });

        systemsRowsData.push(rowData);
    });

    return systemsRowsData;

};

export const responseToJSONData = (data) => {
    const systemsRowsData = formatData(data, 'json');
    return JSON.stringify(systemsRowsData);
};

export const responseToCSVData = (data) => {
    const items =  formatData(data, 'json');
    const header = Object.keys(items[0]);
    const csvData = [
        header.join(','), // header row first
        ...items.map(row => header.map(fieldName => row[fieldName]).join(','))
    ].join('\r\n');

    return csvData;
};

export const generateFilterText = (filters) => {
    let filterText  = '';
    const filterSeparatorOnLine = '\n';
    const hasStateFilter = filters?.stateFilter?.length > 0;
    const hasNameFilter =  filters?.hostnameOrId?.length > 0;
    const hasOsFilter =  filters?.osFilter?.length > 0;

    if (hasStateFilter || hasNameFilter || hasOsFilter) {
        filterText = `${filterSeparatorOnLine}Filters applied${filterSeparatorOnLine}`;
        filterText = hasNameFilter ? filterText.concat(`Name: ${filters.hostnameOrId}${filterSeparatorOnLine}`) : filterText;
        filterText = hasStateFilter ? filterText.concat(`State: ${filters.stateFilter.toString()}${filterSeparatorOnLine}`) : filterText;
        filterText = hasOsFilter ? filterText.concat(`Operating System: ${filters.osFilter.sort().toString()}${filterSeparatorOnLine}`) : filterText;
    }

    return filterText;

};

export const getSystemsReportFileName = () =>  {
    const currentDate = `${new Date().toISOString().replace(/[T:]/g, '-').split('.')[0]}-utc`;
    const reportFileName = `${SYSTEMS_REPORT_FILE_NAME}${currentDate}`;

    return reportFileName;
};

export const formatExecutiveReportData = (data) => {

    const { systems_per_state: systemsPerState, conditions } = data;

    const stateChartData = [];
    const stateTableData = [['# of systems']];

    const conditionsChartData = [];
    const conditionsTableData = [['# of occurrences']];

    const condtionsInfo = {
        io: {
            name: 'Disk IO',
            occurances: []
        },
        memory: {
            name: 'RAM',
            occurances: []
        },
        cpu: {
            name: 'CPU',
            occurances: []
        }
    };

    const stateNameMapping = {
        idling: 'Idling',
        oversized: 'Oversized',
        under_pressure: 'Under pressure', /* eslint-disable-line camelcase */
        undersized: 'Undersized',
        waiting_for_data: 'Waiting for data', /* eslint-disable-line camelcase */
        optimized: 'Optimized'
    };

    Object.keys(systemsPerState).map((state) => {
        const stateName = stateNameMapping[state];
        const percentage = Math.floor(systemsPerState[state]?.percentage);
        const count = systemsPerState[state]?.count;

        stateChartData.push({ x: stateName, y: percentage });
        stateTableData.push([`${count} (${percentage}% of total)`]);
    });

    Object.keys(conditions).map((condition) => {
        const conditionName = condtionsInfo[condition].name;
        const percentage = Math.floor(conditions[condition]?.percentage);
        const count = conditions[condition]?.count;

        conditionsChartData.push({ x: conditionName, y: percentage });
        conditionsTableData.push([`${count}`]);

        const underPressureValue = conditions[condition].under_pressure ? conditions[condition].under_pressure : 0;
        const undersizedValue = conditions[condition].undersized ? conditions[condition].undersized : 0;

        condtionsInfo[condition].occurances.push(['Under pressure', `${underPressureValue}`]);
        condtionsInfo[condition].occurances.push(['Undersized', `${undersizedValue}`]);
    });

    return { stateChartData, stateTableData, conditionsChartData, conditionsTableData, condtionsInfo };
};
