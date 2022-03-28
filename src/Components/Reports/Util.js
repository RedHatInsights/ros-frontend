import { get } from 'lodash';
import { pdfRowKeys, percentageKeys, reportRowKeys, SYSTEMS_REPORT_FILE_NAME } from '../../constants';

export const formatData = (data, type) => {

    const systemsRowsData = [];
    const rowKeys = type === 'json' ?  reportRowKeys : pdfRowKeys;

    data.map((systemItem) => {
        let rowData = type === 'json' ? {} : [];

        rowKeys.map((rowKey) =>{
            let rowValue =  get(systemItem, rowKey, '');
            rowValue = rowValue ? rowValue.toString() : 'N/A';
            rowValue = (rowValue !== 'N/A' && percentageKeys.includes(rowKey)) ? `${rowValue}%` : rowValue;

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
    const replacer = (key, value) => value === null ? 'N/A' : value;
    const header = Object.keys(items[0]);
    const csvData = [
        header.join(','), // header row first
        ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    ].join('\r\n');

    return csvData;
};

export const generateFilterText = (filters) => {
    let filterText  = '';
    const hasStateFilter = filters?.stateFilter?.length > 0;
    const hasNameFilter =  filters?.hostnameOrId?.length > 0;

    if (hasStateFilter || hasNameFilter) {
        filterText = `\nFilters applied\n`;
        filterText = hasStateFilter ? filterText.concat(`State: ${filters.stateFilter.toString()}\t\t\t\t\t`) : filterText;
        filterText = hasNameFilter ? filterText.concat(`Name: ${filters.hostnameOrId}`) : filterText;
    }

    return filterText;

};

export const getSystemsReportFileName = () =>  {
    const currentDate = `${new Date().toISOString().replace(/[T:]/g, '-').split('.')[0]}-utc`;
    const reportFileName = `${SYSTEMS_REPORT_FILE_NAME}${currentDate}`;

    return reportFileName;
};
