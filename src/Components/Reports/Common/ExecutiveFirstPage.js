import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import { Section, Column, Chart, Table } from '@redhat-cloud-services/frontend-components-pdf-generator';
import { Text, View } from '@react-pdf/renderer';
import { formatExecutiveReportData } from '../Util';
import styles from './styles';
import { IconCanvas } from './IconCanvas';

export const ExecutiveFirstPage = ({ data }) => {
    const { conditions_count: conditionsCount, non_optimized_count: nonOptimizedCount, total_count: totalCount, stale_count: staleCount } = data?.meta;
    const optimizedCount = data?.systems_per_state?.optimized?.count;   /* eslint-disable-line camelcase */
    const newLine = '\n';

    const ioOccuranceTableData = [
        [
            <View key={'disk-io-title'} style={styles.flexRow}>
                <IconCanvas fillColor='#8BC1F7'/>
                <Text>Disk I/O</Text>
            </View>

        ]
    ];

    const ramOccuranceTableData = [
        [
            <View key={'memory-title'}  style={styles.flexRow}>
                <IconCanvas fillColor='#002F5D'/>
                <Text>RAM</Text>
            </View>

        ]
    ];

    const cpuOccuranceTableData = [
        [
            <View key={'cpu-title'} style={styles.flexRow}>
                <IconCanvas fillColor='#0066CC'/>
                <Text>CPU</Text>
            </View>

        ]
    ];

    const formattedReportData = formatExecutiveReportData(data);

    const { stateChartData, stateTableData, conditionsChartData,  conditionsTableData, condtionsInfo } = formattedReportData;

    ioOccuranceTableData.push(...condtionsInfo.io.occurances);
    ramOccuranceTableData.push(...condtionsInfo.memory.occurances);
    cpuOccuranceTableData.push(...condtionsInfo.cpu.occurances);

    return <Fragment key="first-page">
        <Text>
            This executive summary highlights the performance for your registered systems included in the resource optimization service.
        </Text>

        {/* {Total Systems} */}
        <Text style={styles.execHeading}>Registered systems</Text>
        {/* eslint-disable-next-line max-len */}
        <Text>
            {/* eslint-disable-next-line max-len */}
            <Text>{`There are`}</Text><Text style={styles.bold}>{` ${totalCount} registered systems `}</Text><Text>{`in the resource optimization service.${newLine}`}</Text>
            {/* eslint-disable-next-line max-len */}
            <Text style={styles.bold}>{`${optimizedCount}`}</Text><Text>{` of ${totalCount} systems are identified as `}</Text><Text style={styles.bold}>optimized, </Text>
            {/* eslint-disable-next-line max-len */}
            <Text style={styles.bold}>{`${nonOptimizedCount}`}</Text><Text>{` of ${totalCount} systems as having a `}</Text><Text style={styles.bold}>non-optimal</Text><Text>{` state.${newLine}`}</Text>
            <Text style={styles.bold}>{`${staleCount}`}</Text><Text>{` of ${totalCount} systems are `}</Text><Text style={styles.bold}>stale*</Text>
        </Text>

        <Text style={styles.execInfoText}>Suggestions for stale systems might no longer apply due to systems not being refreshed in 7 days.*</Text>

        <Text style={styles.execHeading}>Breakdown of registered systems</Text>

        {/* TODO: update based on api response */}
        {/* eslint-disable-next-line max-len */}
        <Text>{`6 systems out of a total of ${totalCount} systems have Kernel Pressure Stall Information Enabled. That helps us provide better suggestions either in breakdown of occurance or registered system section`}</Text>

        <Section>
            <Column>
                <Chart
                    chartType="pie"
                    subTitle="Non-optimal"
                    title={nonOptimizedCount}
                    data={stateChartData}
                    colorSchema={'multi'}
                    legendHeader={'State'}
                    showLabels={false}
                    labels={() => ''}
                />
            </Column>
            <Column>
                <Table
                    withHeader
                    rows={stateTableData}
                />
            </Column>
        </Section>
        <Text style={styles.execInfoText}>Description of states are on the last page of the report*</Text>

        <Text style={styles.execHeading}>System performance issues</Text>
        <Text>{`There are ${conditionsCount} system performance issues.`}</Text>

        <Section>
            <Column>
                <Chart
                    chartType="donut"
                    subTitle="Conditions"
                    title={conditionsCount}
                    data={conditionsChartData}
                    colorSchema={'blue'}
                    legendHeader={'Conditions'}
                    showLabels={false}
                />
            </Column>
            <Column>
                <Table
                    withHeader
                    rows={conditionsTableData}
                />
            </Column>
        </Section>

        <Text style={styles.occuranceHeading}>Breakdown of occurences</Text>

        <Section>
            <Column>
                <Table
                    withHeader
                    rows={ioOccuranceTableData}
                />
            </Column>
            <Column style={{ flex: 0.2 }} />
            <Column>
                <Table
                    withHeader
                    rows={ramOccuranceTableData}
                />
            </Column>
            <Column style={{ flex: 0.2 }} />
            <Column>
                <Table
                    withHeader
                    rows={cpuOccuranceTableData}
                />
            </Column>
        </Section>

        {/* eslint-disable-next-line max-len */}
        <Text style={styles.execInfoText}>Under pressure (*) conditions are only reported for systems where Kernel Pressure Stall Information is enabled. Check the documentation for details.*</Text>
        <Text style={styles.execInfoText}>Description of conditions are on the second page of the report*</Text>
    </Fragment>;
};

ExecutiveFirstPage.propTypes = {
    data: propTypes.object
};

