import React, { Fragment } from 'react';
import { InstancesTable } from './InstancesTable';
import propTypes from 'prop-types';

export const ExecutiveSecondPage = ({ data }) => {

    const { current: currentData, suggested: suggestedData,
        historical: historicalData } =  data?.instance_types_highlights;  /* eslint-disable-line camelcase */
    const { stale_count: staleCount } = data?.meta;

    const instanceDetails = {
        current: {
            heading: 'Current instance types',
            description: 'This is your current state, representing the instances that are already reporting data.',
            data: currentData
        },
        suggested: {
            heading: 'Most suggested instance types (yesterday)',
            description: 'Yesterday we identified these instance types',
            data: suggestedData
        },
        historical: {
            heading: 'Most suggested instance types (45 days)',
            description: 'In the last 45 days we suggested you these instances # of times. ',
            staleDescription: 'Report includes instances running on systems service identified as stale.',
            data: historicalData
        }
    };

    return <Fragment key="third-page">
        <InstancesTable
            id={'current_instance_types'}
            instanceDetails={instanceDetails.current.data}
            heading={instanceDetails.current.heading}
            description={instanceDetails.current.description}

        />

        <InstancesTable
            id='suggested_instance_types'
            instanceDetails={instanceDetails.suggested.data}
            heading={instanceDetails.suggested.heading}
            description={instanceDetails.suggested.description}
        />

        <InstancesTable
            id='historical_instance_types'
            instanceDetails={instanceDetails.historical.data}
            heading={instanceDetails.historical.heading}
            description={staleCount > 0
                ? `${instanceDetails.historical.description}${instanceDetails.historical.staleDescription}`
                : `${instanceDetails.historical.description}` }
        />
    </Fragment>;
};

ExecutiveSecondPage.propTypes = {
    data: propTypes.object
};
