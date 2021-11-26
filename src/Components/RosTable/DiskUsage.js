import { Tooltip } from '@patternfly/react-core';
import React from 'react';
import { NO_DATA_STATE, NO_DATA_VALUE } from '../../constants';
import './DiskUsage.scss';

const mockDiskUsageData = [
    {
        diskName: 'disk A',
        iops: '5,000'
    },
    {
        diskName: 'disk B',
        iops: '3,000'
    },
    {
        diskName: 'disk C',
        iops: '100'
    }
];

export const diskUsageTitle = () =>{
    return (
        <Tooltip content={<span>IOPS</span>}>
            <span>I/O utilization</span>
        </Tooltip>
    );
};

export const DiskUsageData = (data, id, { state }) => {
    return (
        state === NO_DATA_STATE ?
            <span>{ NO_DATA_VALUE }</span> :
            <Tooltip position="right" content={
                <div>
                    <table>
                        <tr>
                            <th>Disk name</th>
                            <th>Value</th>
                        </tr>
                        <tr>
                            <td colSpan="100%" className="seperator"></td>
                        </tr>
                        {
                            mockDiskUsageData.map((item, index) =>{
                                return (
                                    <tr key={index}>
                                        <td>{item.diskName}</td>
                                        <td>{item.iops}</td>
                                        <td>IOPS</td>
                                    </tr>
                                );
                            })
                        }
                    </table>
                </div>
            }>
                <span>{'5,000'}</span>
            </Tooltip>
    );
};
