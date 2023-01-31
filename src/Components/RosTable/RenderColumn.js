import { Tooltip } from '@patternfly/react-core';
import React from 'react';
import { NO_DATA_STATE, NO_DATA_VALUE } from '../../constants';
import { DateFormat, dateStringByType } from '@redhat-cloud-services/frontend-components/DateFormat';
import { ExclamationTriangleIcon } from '@patternfly/react-icons';
import './RenderColumn.scss';
import moment from 'moment';

export const diskUsageData = (data, id, item) => {
    const { state, performance_utilization: performanceUtilization } = item;
    const { io_all: iopsAll } = performanceUtilization;

    return (
        state === NO_DATA_STATE ?
            <span>{ NO_DATA_VALUE }</span> :
            <Tooltip position="right" content={
                <div>
                    <table>
                        <tr>
                            <th>Device name</th>
                            <th>Value</th>
                        </tr>
                        <tr>
                            <td colSpan="100%" className="seperator"></td>
                        </tr>
                        {
                            Object.keys(iopsAll).map((deviceName, index) =>{
                                return (
                                    <tr key={index}>
                                        <td>{deviceName}</td>
                                        <td>{iopsAll[deviceName]}</td>
                                        <td>IOPS</td>
                                    </tr>
                                );
                            })
                        }
                    </table>
                </div>
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
                    <ExclamationTriangleIcon color='var(--pf-global--warning-color--100)' size='sm'/> {relativeDate}
                </span>
            </Tooltip>
            : <DateFormat date={ data } />
    );
};
