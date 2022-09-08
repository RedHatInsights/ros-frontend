import React, { Fragment } from 'react';
import { InstancesTable } from './InstancesTable';

export const ExecutiveThirdPage = () => {

    const currentInstancesDetails = {
        heading: 'Current instance types',
        description: 'This is your current state, that represents reality of how your instance types are doing',
        data: [
            {
                type: 't3.small',
                systemCount: '30',
                // eslint-disable-next-line max-len
                description: 'Intel Xeon E5-2680 v2 (Ivy Bridge) instance with 8 vCPUs and 15 GiB of RAM, running on AWS eu-west-1 and eu-west-2 regions'
            },
            {
                type: 't4g.small',
                systemCount: '42',
                // eslint-disable-next-line max-len
                description: 'Intel Xeon E5-2680 v2 (Ivy Bridge) instance with 8 vCPUs and 15 GiB of RAM, running on AWS eu-west-1 and eu-west-2 regions'
            },
            {
                type: 't1.micro',
                systemCount: '44',
                // eslint-disable-next-line max-len
                description: 'Intel Xeon E5-2680 v2 (Ivy Bridge) instance with 8 vCPUs and 15 GiB of RAM, running on AWS eu-west-1 and eu-west-2 regions'
            },
            {
                type: 't3.micro',
                systemCount: '20',
                // eslint-disable-next-line max-len
                description: 'Intel Xeon E5-2680 v2 (Ivy Bridge) instance with 8 vCPUs and 15 GiB of RAM, running on AWS eu-west-1 and eu-west-2 regions'
            },
            {
                type: 't3.nano',
                systemCount: '10',
                // eslint-disable-next-line max-len
                description: 'Intel Xeon E5-2680 v2 (Ivy Bridge) instance with 8 vCPUs and 15 GiB of RAM, running on AWS eu-west-1 and eu-west-2 regions'
            }
        ]
    };

    const suggestedInstancesDetails = {
        heading: 'Most suggested instance types (yesterday)',
        description: 'Yesterday we identified these instance types',
        data: [
            {
                type: 't3.nano',
                systemCount: '40',
                // eslint-disable-next-line max-len
                description: 'Intel Xeon E5-2680 v2 (Ivy Bridge) instance with 8 vCPUs and 15 GiB of RAM, running on AWS eu-west-1 and eu-west-2 regions'
            },
            {
                type: 't4g.nano',
                systemCount: '20',
                // eslint-disable-next-line max-len
                description: 'Intel Xeon E5-2680 v2 (Ivy Bridge) instance with 8 vCPUs and 15 GiB of RAM, running on AWS eu-west-1 and eu-west-2 regions'
            },
            {
                type: 't1.micro',
                systemCount: '30',
                // eslint-disable-next-line max-len
                description: 'Intel Xeon E5-2680 v2 (Ivy Bridge) instance with 8 vCPUs and 15 GiB of RAM, running on AWS eu-west-1 and eu-west-2 regions'
            },
            {
                type: 't3.micro',
                systemCount: '20',
                // eslint-disable-next-line max-len
                description: 'Intel Xeon E5-2680 v2 (Ivy Bridge) instance with 8 vCPUs and 15 GiB of RAM, running on AWS eu-west-1 and eu-west-2 regions'
            },
            {
                type: 't2.nano',
                systemCount: '10',
                // eslint-disable-next-line max-len
                description: 'Intel Xeon E5-2680 v2 (Ivy Bridge) instance with 8 vCPUs and 15 GiB of RAM, running on AWS eu-west-1 and eu-west-2 regions'
            }
        ]
    };

    const historicalInstancesDetails = {
        heading: 'Most suggested instance types (45 days)',
        description: 'In the last 45 days we suggested you these instances # of times',
        data: [
            {
                type: 't3.nano',
                systemCount: '30',
                // eslint-disable-next-line max-len
                description: 'Intel Xeon E5-2680 v2 (Ivy Bridge) instance with 8 vCPUs and 15 GiB of RAM, running on AWS eu-west-1 and eu-west-2 regions'
            },
            {
                type: 't2.nano',
                systemCount: '42',
                // eslint-disable-next-line max-len
                description: 'Intel Xeon E5-2680 v2 (Ivy Bridge) instance with 8 vCPUs and 15 GiB of RAM, running on AWS eu-west-1 and eu-west-2 regions'
            },
            {
                type: 't1.micro',
                systemCount: '44',
                // eslint-disable-next-line max-len
                description: 'Intel Xeon E5-2680 v2 (Ivy Bridge) instance with 8 vCPUs and 15 GiB of RAM, running on AWS eu-west-1 and eu-west-2 regions'
            },
            {
                type: 't3.micro',
                systemCount: '20',
                // eslint-disable-next-line max-len
                description: 'Intel Xeon E5-2680 v2 (Ivy Bridge) instance with 8 vCPUs and 15 GiB of RAM, running on AWS eu-west-1 and eu-west-2 regions'
            },
            {
                type: 'm1.small',
                systemCount: '10',
                // eslint-disable-next-line max-len
                description: 'Intel Xeon E5-2680 v2 (Ivy Bridge) instance with 8 vCPUs and 15 GiB of RAM, running on AWS eu-west-1 and eu-west-2 regions'
            }
        ]
    };

    return <Fragment key="third-page">
        <InstancesTable
            id={'current_instance_types'}
            instanceDetails={currentInstancesDetails.data}
            heading={currentInstancesDetails.heading}
            description={currentInstancesDetails.description}

        />

        <InstancesTable
            id='suggested_instance_types'
            instanceDetails={suggestedInstancesDetails.data}
            heading={suggestedInstancesDetails.heading}
            description={suggestedInstancesDetails.description}
        />

        <InstancesTable
            id='historical_instance_types'
            instanceDetails={historicalInstancesDetails.data}
            heading={historicalInstancesDetails.heading}
            description={historicalInstancesDetails.description}
        />
    </Fragment>;
};

