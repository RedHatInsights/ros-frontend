import { get } from 'lodash';

export const responseToPDFData = (data) => {
    const systemsRowsData = [];
    const rowKeys = ['display_name', 'os', 'performance_utilization.cpu', 'performance_utilization.memory', 'performance_utilization.max_io',
        'number_of_suggestions', 'state', 'reported_date'];

    data.map((systemItem) => {
        let rowValueArr = [];
        rowKeys.map((rowKey) =>{
            let rowValue =  rowKey === 'reported_date' ? '03 Mar 2022 06:58 UTC'  : get(systemItem, rowKey, '').toString();
            rowValue = (rowKey === 'performance_utilization.cpu' || rowKey === 'performance_utilization.memory') ? `${rowValue}%` : rowValue;
            rowValueArr.push(rowValue);
        });

        systemsRowsData.push(rowValueArr);
    });

    return systemsRowsData;

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
