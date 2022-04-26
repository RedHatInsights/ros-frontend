import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import { Section, Column, Chart, Table } from '@redhat-cloud-services/frontend-components-pdf-generator';
import { Canvas, Text, View } from '@react-pdf/renderer';
import { CircleIconConfig } from '@patternfly/react-icons/dist/js/icons/circle-icon';
import { formatExecutiveReportData } from '../Util';
import styles from './styles';

export const ExecutiveFirstPage = ({ data }) => {
    const { conditions_count: conditionsCount, non_optimized_count: nonOptimizedCount, total_count: totalCount } = data?.meta;
    const newLine = '\n';
    const bullet = '\u2022';

    const ioOccuranceTableData = [
        [
            <View key={'disk-io-title'} style={{ display: 'flex',
                flexDirection: 'row' }}>
                <Canvas
                    style={{
                        width: 15,
                        height: 10,
                        padding: 2
                    }}
                    paint={({ path, scale }) => {
                        scale(0.014);
                        path(CircleIconConfig.svgPath).fill('#8BC1F7');
                    }}
                />
                <Text>Disk I/O</Text>
            </View>

        ]
    ];

    const ramOccuranceTableData = [
        [
            <View key={'ram-title'}  style={{ display: 'flex',
                flexDirection: 'row' }}>
                <Canvas
                    style={{
                        width: 15,
                        height: 10,
                        padding: 2
                    }}
                    paint={({ path, scale }) => {
                        scale(0.014);
                        path(CircleIconConfig.svgPath).fill('#002F5D');
                    }}
                />
                <Text>RAM</Text>
            </View>

        ]
    ];

    const cpuOccuranceTableData = [
        [
            <View key={'cpu-title'} style={{ display: 'flex',
                flexDirection: 'row' }}>
                <Canvas
                    style={{
                        width: 15,
                        height: 10,
                        padding: 2
                    }}
                    paint={({ path, scale }) => {
                        scale(0.014);
                        path(CircleIconConfig.svgPath).fill('#0066CC');
                    }}
                />
                <Text>CPU</Text>
            </View>

        ]
    ];

    const formattedReportData = formatExecutiveReportData(data);

    const { stateChartData, stateTableData, conditionsChartData,  conditionsTableData, condtionsInfo } = formattedReportData;

    ioOccuranceTableData.push(...condtionsInfo.io.occurances);
    ramOccuranceTableData.push(...condtionsInfo.ram.occurances);
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

        <Text style={styles.execHeading}>Total systems registered</Text>
        <Text>{`There are ${totalCount} systems registered in the resource optimization service.`}</Text>

        {/* {State Data} */}

        <Text style={styles.execHeading}>Number of registered systems in a non-optimal state</Text>
        <Text>{`There are ${nonOptimizedCount} registered systems in a non-optimal state.`}</Text>

        <Section>
            <Column>
                <Chart
                    chartType="pie"
                    subTitle="State"
                    title="100"
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

        <Text style={styles.execHeading}>Number of system performance issues</Text>
        <Text>{`There are ${conditionsCount} system performance issues.`}</Text>

        <Section>
            <Column>
                <Chart
                    chartType="pie"
                    subTitle="Conditions"
                    title="100"
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
            <Column style={{ flex: 0.2 }}>
            </Column>
            <Column>
                <Table
                    withHeader
                    rows={ramOccuranceTableData}
                />
            </Column>
            <Column style={{ flex: 0.2 }}>
            </Column>
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

