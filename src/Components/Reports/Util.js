import React from 'react';
import { Text } from '@react-pdf/renderer';
import styles from './Common/styles';
import { get } from 'lodash';

const columnBuilder = ({ value, style }) => <Text key={value} style={style}>{value}</Text>;

export const buildSystemsRows = (data) => {
    const systemsRows = [];
    const rowKeys = ['display_name', 'os', 'performance_utilization.cpu', 'performance_utilization.memory', 'performance_utilization.max_io', 'number_of_suggestions', 'state', 'reported_date'];

    data.map((systemItem) =>{
        let rowValueArr = [];
        rowKeys.map((rowKey) =>{
            let rowValue =  rowKey === 'reported_date' ? '03 Mar 2022 06:58 UTC'  : get(systemItem, rowKey, '').toString();
            rowValue = (rowKey === 'performance_utilization.cpu' || rowKey === 'performance_utilization.memory') ? `${rowValue}%` : rowValue;
            let styleArr = rowKey === 'display_name' ? [styles.systemNameCell, styles.bodyCell] : [styles.bodyCell];
            rowValueArr.push(columnBuilder({ value: rowValue, style: styleArr }));
        });

        systemsRows.push(rowValueArr);
    });

    return systemsRows;

};

export const buildSystemsHeader = () => {

    const headerContent = ['Name', 'OS', 'CPU utilization', 'Memory utilization', 'I/O utilization', 'Suggestions', 'State', 'Last reported'];
    const formattedHeader = headerContent.map(item => {
        let styleArr = item === 'Name' ? [styles.systemNameCell, styles.headerCell] : [styles.headerCell];
        return columnBuilder({ value: item, style: styleArr });
    });

    return formattedHeader;

};
