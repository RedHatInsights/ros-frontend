import { get } from 'lodash';
import { pdfRowKeys, percentageKeys, reportRowKeys, SYSTEMS_REPORT_FILE_NAME } from './Constants';
import { dateStringByType } from '@redhat-cloud-services/frontend-components/DateFormat/helper';

export const formatData = (data, type, isWorkSpaceEnabled = false) => {

    const systemsRowsData = [];
    let NoGroupValue = 'No group';

    if (isWorkSpaceEnabled) {
        NoGroupValue = 'No workspace';
    }

    const rowKeys = type === 'json' ?  reportRowKeys : pdfRowKeys;

    data.map((systemItem) => {
        let rowData = type === 'json' ? {} : [];

        rowKeys.map((rowKey) =>{
            let rowValue;
            if (rowKey === 'groups') {
                rowValue =  get(systemItem, rowKey, []);
                rowValue = rowValue.length === 0  ? NoGroupValue : rowValue[0].name;

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

export const responseToJSONData = (data, isWorkSpaceEnabled) => {
    const systemsRowsData = formatData(data, 'json', isWorkSpaceEnabled);
    return JSON.stringify(systemsRowsData);
};

export const responseToCSVData = (data, isWorkSpaceEnabled) => {
    const items =  formatData(data, 'json', isWorkSpaceEnabled);
    const header = Object.keys(items[0]);
    const csvData = [
        header.join(','), // header row first
        ...items.map(row => header.map(fieldName => row[fieldName]).join(','))
    ].join('\r\n');

    return csvData;
};

export const generateFilterText = (filters, isWorkSpaceEnabled = false) => {
    let filterText  = '';
    const groupOrWorkspace = isWorkSpaceEnabled ? 'Groups:' : 'Workspaces:';
    const filterSeparatorOnLine = '\n';
    const hasStateFilter = filters?.stateFilter?.length > 0;
    const hasNameFilter =  filters?.hostnameOrId?.length > 0;
    const hasOsFilter =  filters?.osFilter?.length > 0;
    const hasgroupFilter = filters?.groupFilter?.length > 0;

    if (hasStateFilter || hasNameFilter || hasOsFilter || hasgroupFilter) {
        filterText = `${filterSeparatorOnLine}Filters applied${filterSeparatorOnLine}`;
        filterText = hasNameFilter ? filterText.concat(`Name: ${filters.hostnameOrId}${filterSeparatorOnLine}`) : filterText;
        filterText = hasStateFilter ? filterText.concat(`State: ${filters.stateFilter.toString()}${filterSeparatorOnLine}`) : filterText;
        filterText = hasOsFilter ? filterText.concat(`Operating System: ${filters.osFilter.sort().toString()}${filterSeparatorOnLine}`) : filterText;
        filterText = hasgroupFilter ? filterText.concat(`${groupOrWorkspace} ${filters.groupFilter.toString()}`) : filterText;
    }

    return filterText;

};

export const getSystemsReportFileName = () =>  {
    const currentDate = `${new Date().toISOString().replace(/[T:]/g, '-').split('.')[0]}-utc`;
    const reportFileName = `${SYSTEMS_REPORT_FILE_NAME}${currentDate}`;

    return reportFileName;
};

