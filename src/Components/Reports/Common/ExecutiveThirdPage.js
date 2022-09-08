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

export const ExecutiveThirdPage = () => {

    const stateDescription = [
        {
            title: 'Optimized',
            description: 'Performing at an optimal level',
            iconPath: CheckCircleIconConfig.svgPath,
            iconScale: 0.014,
            fillColor: 'green'
        },
        {
            title: 'Under pressure',
            description: 'Peaking occasionally',
            iconPath: TachometerAltIconConfig.svgPath,
            iconScale: 0.014,
            fillColor: '#030303'
        },
        {
            title: 'Undersized',
            description: 'Using more than 80% of system resources',
            iconPath: AngleDoubleDownIconConfig.svgPath,
            iconScale: 0.014,
            fillColor: 'red'
        },
        {
            title: 'Oversized',
            description: 'Using less than 20% of system resources',
            iconPath: AngleDoubleUpIconConfig.svgPath,
            iconScale: 0.014,
            fillColor: '#f09800'
        },
        {
            title: 'Idling',
            description: 'Consuming less than 5% of resources',
            iconPath: AutomationIconConfig.svgPath,
            iconScale: 0.008,
            fillColor: '#030303'
        },
        {
            title: 'Waiting for data',
            description: 'Data has not been received or is being processed. Initial data processing takes up to 24 hours.',
            iconPath: InProgressIconConfig.svgPath,
            iconScale: 0.008,
            fillColor: '#2B9AF3'
        }
    ];

    const conditionsDescription = [
        {
            title: 'CPU pressure',
            description: 'CPU registered peaks higher than 20% over several one-minute time periods'
        },
        {
            title: 'Disk I/O  pressure',
            description: 'Disk I/O registered peaks higher than 20% over several one-minute time periods'
        },
        {
            title: 'RAM pressure',
            description: 'RAM registered peaks higher than 20% over several one-minute time periods'
        }
    ];

    return <Fragment key="second-page">
        <Text style={styles.execHeading}>Description of states</Text>
        {
            stateDescription.map(
                (state) => <DescriptionList
                    key={state.title}
                    title={state.title}
                    description={state.description}
                    iconPath={state.iconPath}
                    iconScale={state.iconScale}
                    fillColor={state.fillColor} />)
        }

        <Text style={styles.execHeading}>Description of conditions</Text>
        {
            conditionsDescription.map(
                (condition) => <DescriptionList
                    key={condition.title}
                    title={condition.title}
                    description={condition.description}/>)
        }
    </Fragment>;
};

