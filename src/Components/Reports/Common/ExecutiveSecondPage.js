import React, { Fragment } from 'react';
import { InstancesTable } from './InstancesTable';
import propTypes from 'prop-types';

export const ExecutiveSecondPage = ({ data }) => {

    const { current: currentData, suggested: suggestedData,
        historical: historicalData } =  data?.instance_types_highlights;  /* eslint-disable-line camelcase */
    const { stale_count: staleCount } = data?.meta;

    const instanceTableDetails = [
        {
            id: 'current_instance_types',
            heading: 'Most used current instance types',
            description: 'Based on instances that are already reporting data.',
            data: currentData
        },
        {
            id: 'suggested_instance_types',
            heading: 'Most suggested instance types (yesterday)',
            description: 'Yesterday we identified these instance types.',
            data: suggestedData
        },
        {
            id: 'historical_instance_types',
            heading: 'Most suggested instance types (45 days)',
            description: 'In the last 45 days we suggested you these instances # of times. ',
            staleDescription: 'Some of the instances are now identified as stale (more than 7 days not reporting data).',
            data: historicalData
        }
    ];

    return <Fragment key="third-page">
        {
            instanceTableDetails.map(
                (instanceTable, index) => <InstancesTable
                    key={`${index}-${instanceTable.id}`}
                    id={instanceTable.id}
                    instanceDetails={instanceTable.data}
                    heading={instanceTable.heading}
                    description={staleCount > 0 && instanceTable.id.includes('historical')
                        ? `${instanceTable.description}${instanceTable.staleDescription}`
                        : `${instanceTable.description}` }
                />
            )
        }
    </Fragment>;
};

ExecutiveSecondPage.propTypes = {
    data: propTypes.object
};
