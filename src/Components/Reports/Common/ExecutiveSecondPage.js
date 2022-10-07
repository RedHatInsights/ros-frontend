import React, { Fragment } from 'react';
import { InstancesTable } from './InstancesTable';
import propTypes from 'prop-types';

export const ExecutiveSecondPage = ({ data }) => {

    const { current, suggested, historical } =  data?.instance_types_highlights;  /* eslint-disable-line camelcase */
    const { stale_count: staleCount } = data?.meta;

    const currentInstancesDetails = {
        heading: 'Current instance types',
        description: 'This is your current state, representing the instances that are already reporting data.',
        data: current
    };

    const suggestedInstancesDetails = {
        heading: 'Most suggested instance types (yesterday)',
        description: 'Yesterday we identified these instance types',
        data: suggested
    };

    const historicalInstancesDetails = {
        heading: 'Most suggested instance types (45 days)',
        description: 'In the last 45 days we suggested you these instances # of times. ',
        staleDescription: 'Report includes instances running on systems service identified as stale.',
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
            description={staleCount > 0
                ? `${historicalInstancesDetails.description}${historicalInstancesDetails.staleDescription}`
                : `${historicalInstancesDetails.description}` }
        />
    </Fragment>;
};

ExecutiveSecondPage.propTypes = {
    data: propTypes.object
};
