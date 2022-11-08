import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import { Section, Column, Chart, Table } from '@redhat-cloud-services/frontend-components-pdf-generator';
import { Text, View } from '@react-pdf/renderer';
import { formatExecutiveReportData, pluralize } from '../Util';
import styles from './styles';
import { IconCanvas } from './IconCanvas';

const renderRegisteredSystems = (data) => {

    const { non_optimized_count: nonOptimizedCount,
        total_count: totalCount, stale_count: staleCount } = data?.meta;

    const optimizedCount = data?.systems_per_state?.optimized?.count;   /* eslint-disable-line camelcase */
    const newLine = '\n';

    return <View>
        {/* {Total Systems} */}
        <Text style={styles.execHeading}>Registered systems</Text>
        {/* eslint-disable-next-line max-len */}
        <Text>
            {/* eslint-disable-next-line max-len */}
            <Text>{`There ${pluralize(totalCount, 'is', 'are')}`}</Text><Text style={styles.bold}>{` ${totalCount} registered ${pluralize(totalCount, 'system')} `}</Text><Text>{`in the resource optimization service.${newLine}`}</Text>
            {/* eslint-disable-next-line max-len */}
            <Text style={styles.bold}>{`${optimizedCount}`}</Text><Text>{` of ${totalCount} ${pluralize(totalCount, 'system')} ${pluralize(optimizedCount, 'is', 'are')} identified as `}</Text><Text style={styles.bold}>optimized, </Text>
            {/* eslint-disable-next-line max-len */}
            <Text style={styles.bold}>{`${nonOptimizedCount}`}</Text><Text>{` of ${totalCount} ${pluralize(totalCount, 'system')} as having a `}</Text><Text style={styles.bold}>non-optimal</Text><Text>{` state.${newLine}`}</Text>
            {/* eslint-disable-next-line max-len */}
            <Text style={styles.bold}>{`${staleCount}`}</Text><Text>{` of ${totalCount} ${pluralize(totalCount, 'system')} ${pluralize(staleCount, 'is', 'are')} `}</Text><Text style={styles.bold}>stale*</Text>
        </Text>

        <Text style={styles.execInfoText}>Suggestions for stale systems might no longer apply due to systems not being refreshed in 7 days.*</Text>
    </View>;

};

const renderRegisteredSysBreakdown = (data) => {
    const { non_optimized_count: nonOptimizedCount, non_psi_count: nonPSICount,
        psi_enabled_count: psiEnabledCount, total_count: totalCount } = data?.meta;

    const formattedReportData = formatExecutiveReportData(data);

    const { stateChartData, stateTableData } = formattedReportData;

    return <View>
        <Text style={styles.execHeading}>Breakdown of registered systems</Text>
        {

            nonPSICount > 0
                && <Text>{
                    /* eslint-disable-next-line max-len */
                    `${psiEnabledCount} systems out of a total of ${totalCount} systems have Kernel Pressure Stall Information enabled. You could get better suggestions for ${nonPSICount} systems if you enabled Pressure Stall Information. Check the documentation to learn how.`
                }</Text>
        }

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
    </View>;
};

const renderPerformanceIssues = (data) => {

    const { conditions_count: conditionsCount } = data?.meta;
    const formattedReportData = formatExecutiveReportData(data);
    const { conditionsChartData,  conditionsTableData } = formattedReportData;

    return <View>

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
    </View>;
};

const renderOccurrenceBreakdown = (data) => {
    const formattedReportData = formatExecutiveReportData(data);
    const { conditionsInfo } = formattedReportData;

    const ioOccurenceTableData = [
        [
            <View key={'disk-io-title'} style={styles.flexRow}>
                <IconCanvas fillColor='#8BC1F7'/>
                <Text>Disk I/O</Text>
            </View>

        ]
    ];

    const ramOccurrenceTableData = [
        [
            <View key={'memory-title'}  style={styles.flexRow}>
                <IconCanvas fillColor='#002F5D'/>
                <Text>RAM</Text>
            </View>

        ]
    ];

    const cpuOccurrenceTableData = [
        [
            <View key={'cpu-title'} style={styles.flexRow}>
                <IconCanvas fillColor='#0066CC'/>
                <Text>CPU</Text>
            </View>

        ]
    ];

    ioOccurenceTableData.push(...conditionsInfo.io.occurrences);
    ramOccurrenceTableData.push(...conditionsInfo.memory.occurrences);
    cpuOccurrenceTableData.push(...conditionsInfo.cpu.occurrences);

    return <View>
        <Text style={styles.occurrenceHeading}>Breakdown of occurences</Text>

        <Section>
            <Column>
                <Table
                    withHeader
                    rows={ioOccurenceTableData}
                />
            </Column>
            <Column style={{ flex: 0.2 }} />
            <Column>
                <Table
                    withHeader
                    rows={ramOccurrenceTableData}
                />
            </Column>
            <Column style={{ flex: 0.2 }} />
            <Column>
                <Table
                    withHeader
                    rows={cpuOccurrenceTableData}
                />
            </Column>
        </Section>

        {/* eslint-disable-next-line max-len */}
        <Text style={styles.execInfoText}>Under pressure (*) conditions are only reported for systems where Kernel Pressure Stall Information is enabled. Check the documentation for details.*</Text>
        <Text style={styles.execInfoText}>Description of conditions are on the second page of the report*</Text>

    </View>;
};

export const ExecutiveFirstPage = ({ data }) => {

    return <Fragment key="first-page">
        <Text>
            This executive summary highlights the performance for your registered systems included in the resource optimization service.
        </Text>

        {renderRegisteredSystems(data)}

        {renderRegisteredSysBreakdown(data)}

        {renderPerformanceIssues(data)}

        {renderOccurrenceBreakdown(data)}

    </Fragment>;
};

ExecutiveFirstPage.propTypes = {
    data: propTypes.object
};

