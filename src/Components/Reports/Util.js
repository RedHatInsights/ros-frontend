import { get } from 'lodash';
import { pdfRowKeys, percentageKeys, reportRowKeys, SYSTEMS_REPORT_FILE_NAME } from './Constants';
import { dateStringByType } from '@redhat-cloud-services/frontend-components/DateFormat/helper';

export const formatData = (data, type) => {

    const systemsRowsData = [];
    const rowKeys = type === 'json' ?  reportRowKeys : pdfRowKeys;

    data.map((systemItem) => {
        let rowData = type === 'json' ? {} : [];

        rowKeys.map((rowKey) =>{
            let rowValue;
            if (rowKey === 'groups') {
                rowValue =  get(systemItem, rowKey, []);
                rowValue = rowValue.length === 0  ? 'N/A' : rowValue[0].name;

            } else {
                rowValue =   get(systemItem, rowKey, '');
                rowValue = (rowValue === null || rowValue === -1) ?  'N/A' : rowValue.toString();
                rowValue = (rowValue !== 'N/A' && percentageKeys.includes(rowKey)) ? `${rowValue}%` : rowValue;
                rowValue = (rowKey === 'report_date') ? dateStringByType('exact')(new Date(rowValue)) : rowValue;
            }

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

