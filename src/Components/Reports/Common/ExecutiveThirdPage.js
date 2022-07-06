import React, { Fragment } from 'react';
import { Text } from '@react-pdf/renderer';
import { TachometerAltIconConfig } from '@patternfly/react-icons/dist/js/icons/tachometer-alt-icon';
import { AngleDoubleDownIconConfig } from '@patternfly/react-icons/dist/js/icons/angle-double-down-icon';
import { AngleDoubleUpIconConfig } from '@patternfly/react-icons/dist/js/icons/angle-double-up-icon';
import { AutomationIconConfig } from '@patternfly/react-icons/dist/js/icons/automation-icon';
import { InProgressIconConfig } from '@patternfly/react-icons/dist/js/icons/in-progress-icon';
import { CheckCircleIconConfig } from '@patternfly/react-icons/dist/js/icons/check-circle-icon';
import styles from './styles';
import { DescriptionList } from './DescriptionList';
import { InstancesTable } from './InstancesTable';

export const ExecutiveThirdPage = () => {

    const instancesDetails = [
        {
            type: 'c1.medium',
            systemCount: '44',
            description: 'CPU registered peaks higher than 20% over several one-minute time periods'
        },
        {
            type: 't2.micro',
            systemCount: '42',
            description: 'CPU registered peaks higher than 20% over several one-minute time periods'
        },
        {
            type: 't1.micro',
            systemCount: '44',
            description: 'CPU registered peaks higher than 20% over several one-minute time periods'
        },
    ];

    return <Fragment key="third-page">
        {
            instancesDetails.map(
                (instanceDetail) => <InstancesTable 
                                            key={instanceDetail.type}
                                            type={instanceDetail.type} 
                                            systemCount={instanceDetail.systemCount} 
                                            description={instanceDetail.description}/>)
        }
    </Fragment>;
};

