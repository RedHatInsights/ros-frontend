import { Icon, Tooltip } from '@patternfly/react-core';
import React from 'react';
import { NO_DATA_STATE, NO_DATA_VALUE } from '../../constants';
import { DateFormat, dateStringByType } from '@redhat-cloud-services/frontend-components/DateFormat';
import { ExclamationTriangleIcon } from '@patternfly/react-icons';
import './RenderColumn.scss';
import moment from 'moment';
import { Table /* data-codemods */, Thead, Tr, Th, Td, Tbody } from '@patternfly/react-table';

const diskUsageStyle = {
    color: 'white',
    backgroundColor: 'black',
    padding: '0px'
};

export const diskUsageData = (data, id, item) => {
    const { state, performance_utilization: performanceUtilization } = item;
    const { io_all: iopsAll } = performanceUtilization;

    return (
        state === NO_DATA_STATE ?
            <span>{ NO_DATA_VALUE }</span> :
            <Tooltip position="right" content={
                <Table
                    arial-label="disk usage"
                    variant="compactBorderless"
                    borders={false}
                >
                    <Thead>
                        <Tr>
                            <Th modifier="nowrap" textCenter style={diskUsageStyle}>Device Name</Th>
                            <Th textCenter style={diskUsageStyle}>Value</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            Object.keys(iopsAll).map((deviceName, index) =>{
                                return (
                                    <Tr key={index}>
                                        <Td style={diskUsageStyle}>{deviceName}</Td>
                                        <Td modifier="nowrap" style={diskUsageStyle}>{iopsAll[deviceName]} IOPS</Td>
                                    </Tr>
                                );
                            })
                        }
                    </Tbody>
                </Table>
            }>
                <span>{data}</span>
            </Tooltip>
    );
};

export const displayOS = (data) => {
    return (
        data === null ?
            <span>{ NO_DATA_VALUE }</span> :
            <span>{ data }</span>
    );
};

export const displayLastReported = (data) => {
    if (!data) {return <span>{ NO_DATA_VALUE }</span>;}

    const daysAgoSeven = moment().subtract(7, 'days');
    const isStale = moment(data).isBefore(daysAgoSeven);
    const lastReported = new Date(data);
    const exactDate = dateStringByType('exact')(lastReported);
    const relativeDate = dateStringByType('relative')(lastReported);
    // eslint-disable-next-line max-len
    const staleTooltipText = `System was not refreshed in the last 7 days.\nSuggestions for this system might be outdated due to reporting issues.\nLast reported: ${exactDate}`;

    return (
        isStale ?
            <Tooltip content={<div>{ staleTooltipText }</div>}>
                <span className='staleText'>
                    <Icon size='md'>
                        <ExclamationTriangleIcon />
                    </Icon> {relativeDate}
                </span>
            </Tooltip>
            : <DateFormat date={ data } />
    );
};

export const displayGroup = (data) => {
    return (
        data.length === 0 ?
            <span className="pf-v5-u-disabled-color-200">No group</span> :
            <span>{ data[0].name }</span>
    );
};
