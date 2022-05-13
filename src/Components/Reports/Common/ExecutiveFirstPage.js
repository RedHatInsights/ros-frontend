import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import { Section, Column, Chart, Table } from '@redhat-cloud-services/frontend-components-pdf-generator';
import { Text, View } from '@react-pdf/renderer';
import { formatExecutiveReportData } from '../Util';
import styles from './styles';
import { IconCanvas } from './IconCanvas';

export const ExecutiveFirstPage = ({ data }) => {
    const { conditions_count: conditionsCount, non_optimized_count: nonOptimizedCount, total_count: totalCount } = data?.meta;
    const newLine = '\n';
    const bullet = '\u2022';

    const ioOccuranceTableData = [
        [
            <View key={'disk-io-title'} style={{ display: 'flex',
                flexDirection: 'row' }}>
                <IconCanvas fillColor='#8BC1F7'/>
                <Text>Disk I/O</Text>
            </View>

        ]
    ];

    const ramOccuranceTableData = [
        [
            <View key={'memory-title'}  style={{ display: 'flex',
                flexDirection: 'row' }}>
                <IconCanvas fillColor='#002F5D'/>
                <Text>RAM</Text>
            </View>

        ]
    ];

    const cpuOccuranceTableData = [
        [
            <View key={'cpu-title'} style={{ display: 'flex',
                flexDirection: 'row' }}>
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
        <Text>
            {`This report gives you an overview of:${newLine}`}
        </Text>

        <Text>
            {
                `${bullet} The number of systems registered
                ${bullet} Number of registered systems in a non-optimal state
                ${bullet} Number of system performance issues
                ${bullet} Description of system performance levels
                ${bullet} Performance level details for system resources operating in a non-optimal state`}
        </Text>

        {/* {Total Systems} */}
        {/* FIXME: Add count of optimized systems */}
        <Text style={styles.execHeading}>Registered systems</Text>
        {/* eslint-disable-next-line max-len */}
        <Text>{`There are ${totalCount} systems registered in the resource optimization service. The service identified 32 of ${totalCount} systems as optimized, and ${nonOptimizedCount} of ${totalCount} registered systems as having a non-optimal state.`}</Text>

        <Text style={styles.execHeading}>Breakdown of registered systems</Text>
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
                />
            </Column>
            <Column>
                <Table
                    withHeader
                    rows={stateTableData}
                />
            </Column>
        </Section>
        <Text style={styles.execInfoText}>Description of states are on the second page of the report*</Text>

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

        <Text style={styles.execInfoText}>Description of conditions are on the second page of the report*</Text>
    </Fragment>;
};

ExecutiveFirstPage.propTypes = {
    data: propTypes.object
};

