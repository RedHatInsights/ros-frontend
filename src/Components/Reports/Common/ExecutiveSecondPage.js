import React, { Fragment } from 'react';
import { InstancesTable } from './InstancesTable';

export const ExecutiveSecondPage = (data) => {

    const { current, suggested, historical } =  data?.instance_types_highlights;  /* eslint-disable-line camelcase */

    const currentInstancesDetails = {
        heading: 'Current instance types',
        description: 'This is your current state, that represents reality of how your instance types are doing',
        data: current
    };

    const suggestedInstancesDetails = {
        heading: 'Most suggested instance types (yesterday)',
        description: 'Yesterday we identified these instance types',
        data: suggested
    };

    const historicalInstancesDetails = {
        heading: 'Most suggested instance types (45 days)',
        description: 'In the last 45 days we suggested you these instances # of times',
        data: historical
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

