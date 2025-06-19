/* eslint-disable camelcase */
import React, { Fragment, ReactNode } from 'react';
import { ChartDonut, ChartPie, ChartThemeColor, getThemeColors } from '@patternfly/react-charts';
import {
    Bullseye,
    Grid,
    GridItem,
    Split,
    SplitItem,
    Stack,
    StackItem,
    Text,
    TextContent,
    TextVariants,
    Title
} from '@patternfly/react-core';
import { AngleDoubleDownIcon, AngleDoubleUpIcon, AutomationIcon, CheckCircleIcon, InProgressIcon, TachometerAltIcon } from '@patternfly/react-icons';
import {
    global_danger_color_100,
    global_info_color_100,
    global_palette_blue_400,
    global_success_color_100,
    global_warning_color_100
} from '@patternfly/react-tokens';
import {
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from '@patternfly/react-table';
import type { FetchData } from '@redhat-cloud-services/types';
import type { AxiosRequestConfig } from 'axios';

import TableLegend from './TableLegend';
import TextWithColorDot from './TextWithColorDot';
import { InstanceHighlights, InstancesTable } from './InstancesTable';

export const pluralize = (count: number, singular: string, plural?: string) => {
    if (!plural) {
        plural = `${singular}s`;
    }

    return `${count === 1 ? singular : plural}`;
};

interface PageProps extends React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode;
}

const PageBreak: React.FunctionComponent<PageProps> = ({ children }: PageProps) => (
    <div className='pf-v5-u-m-xl' style={{
        pageBreakAfter: 'always'
    }}>{children}</div>
);

type AsyncData = {
    data: {
        conditions: {
            io: {
                count: number;
                under_pressure: number;
                undersized: number;
                oversized: number;
            };
            memory: {
                count: number;
                under_pressure: number;
                undersized: number;
                oversized: number;
            };
            cpu: {
                count: number;
                under_pressure: number;
                undersized: number;
                oversized: number;
            };
        };
        systems_per_state: {
            optimized: {
                count: number;
                percentage: number;
            };
            under_pressure: {
                count: number;
                percentage: number;
            };
            undersized: {
                count: number;
                percentage: number;
            };
            oversized: {
                count: number;
                percentage: number;
            };
            idling: {
                count: number;
                percentage: number;
            };
            waiting_for_data: {
                count: number;
                percentage: number;
            };
        };
        instance_types_highlights: {
            current: InstanceHighlights[];
            suggested: InstanceHighlights[];
            historical: InstanceHighlights[];
        };
        meta: {
            conditions_count: number;
            non_optimized_count: number;
            non_psi_count: number;
            psi_enabled_count: number;
            total_count: number;
            stale_count: number;
        };
    };
  }

const DescriptionList = ({
    data
}: {
  data: { title: ReactNode; description: ReactNode; icon?: ReactNode }[];
}) => (
    <Grid>
        {data.map(({ title, description, icon }, index) => (
            <Fragment key={index}>
                <GridItem span={3}>
                    {icon && <span className="pf-v5-u-mr-sm pf-v5-u-font-size-sm">{icon}</span>}
                    <span className="pf-v5-u-font-size-sm">{title}</span>
                </GridItem>
                <GridItem span={9} className="pf-v5-u-font-size-sm">
                    {description}
                </GridItem>
            </Fragment>
        ))}
    </Grid>
);

type CreateAxiosRequest<T = any> = (service: string, config: AxiosRequestConfig) => Promise<T>;

export const fetchData: FetchData = async (createAsyncRequest: CreateAxiosRequest) => {
    return createAsyncRequest('ros-backend', {
        method: 'GET',
        url: '/api/ros/v1/executive_report'
    });
};

const ExecutiveReport = ({ asyncData: { data } }: { asyncData: AsyncData }) => {
    const {
        conditions: {
            io: { count: ioCount, ...ioConditions },
            memory: { count: memoryCount, ...memoryConditions },
            cpu: { count: cpuCount, ...cpuConditions }
        },
        systems_per_state: {
            optimized: { count: optimizedCount, percentage: optimizedPercentage },
            under_pressure: {
                count: underPressureCount,
                percentage: userPressurePercentage
            },
            undersized: { count: undersizedCount, percentage: undersizedPercentage },
            oversized: { count: oversizedCount, percentage: oversizedPercentage },
            idling: { count: idlingCount, percentage: idlingPercentage },
            waiting_for_data: {
                count: waitingForDataCount,
                percentage: waitingForDataPercentage
            }
        },
        instance_types_highlights: {
            current: currentData,
            suggested: suggestedData,
            historical: historicalData
        },
        meta: {
            conditions_count: conditionsCount,
            non_optimized_count: nonOptimizedCount,
            non_psi_count: nonPSICount,
            psi_enabled_count: psiEnabledCount,
            total_count: totalCount,
            stale_count: staleCount
        }
    } = data;

    const breakdownData = [
        {
            x: 'Optimized',
            y: optimizedCount,
            percentage: optimizedPercentage
        },
        {
            x: 'Under pressure',
            y: underPressureCount,
            percentage: userPressurePercentage
        },
        {
            x: 'Undersized',
            y: undersizedCount,
            percentage: undersizedPercentage
        },
        {
            x: 'Oversized',
            y: oversizedCount,
            percentage: oversizedPercentage
        },
        {
            x: 'Idling',
            y: idlingCount,
            percentage: idlingPercentage
        },
        {
            x: 'Waiting for data',
            y: waitingForDataCount,
            percentage: waitingForDataPercentage
        }
    ];

    const performanceData = [
        {
            x: 'Disk IO',
            y: ioCount
        },
        {
            x: 'RAM',
            y: memoryCount
        },
        {
            x: 'CPU',
            y: cpuCount
        }
    ];

    const instanceTableDetails = [
        {
            id: 'current_instance_types',
            heading: 'Most used current instance types',
            description: 'We have identified these instance types based on the data from the fresh systems.',
            data: currentData
        },
        {
            id: 'suggested_instance_types',
            heading: 'Most suggested instance types',
            description: 'We are suggesting these instance types based on the data from the fresh systems.',
            data: suggestedData
        },
        {
            id: 'historical_instance_types',
            heading: 'Most suggested instance types (45 days)',
            description: 'In the last 45 days we suggested you these instances # of times.',
            staleDescription: 'Some of the instances are now identified as stale (more than 7 days not reporting data).',
            data: historicalData
        }
    ];

    const blueColorScale = getThemeColors(ChartThemeColor.blue).pie?.colorScale;
    const breakdownColors = getThemeColors(ChartThemeColor.multiOrdered).pie?.colorScale;
    return (
        <Fragment>
            <PageBreak>
                <Title
                    headingLevel="h1"
                    className="pf-v5-u-danger-color-100 pf-v5-u-font-size-4xl pf-v5-u-mb-lg"
                >
                  Resource optimization service report
                </Title>
                <Stack>
                    <StackItem>
                        <TextContent>
                            <Text className="pf-v5-u-font-size-xs">
                              This executive summary highlights the performance for your
                              registered systems included in the resource optimization
                              service.
                            </Text>
                        </TextContent>
                    </StackItem>
                    <StackItem>
                        <Title
                            headingLevel="h5"
                            size="md"
                            style={{
                                marginTop: '6px',
                                color: 'var(--pf-v5-global--danger-color--100)'
                            }}
                        >
                          Registered systems
                        </Title>

                        <TextContent style={{ margin: '8px 0' }}>
                            <Text
                                className="pf-v5-u-font-size-xs"
                                component={TextVariants.p}
                                style={{ lineHeight: '50%' }}
                            >
                              There {pluralize(totalCount, 'is', 'are')}{' '}
                                <span style={{ fontWeight: 700 }}>
                                    {totalCount} registered {pluralize(totalCount, 'system')}
                                </span>{' '}
                              in the resource optimization service.
                            </Text>

                            <Text
                                className="pf-v5-u-font-size-xs"
                                component={TextVariants.p}
                                style={{ lineHeight: '50%' }}
                            >
                                <span style={{ fontWeight: 700 }}>{optimizedCount}</span> of{' '}
                                {totalCount} {pluralize(totalCount, 'system')}{' '}
                                {pluralize(optimizedCount, 'is', 'are')} identified as{' '}
                                <span style={{ fontWeight: 700 }}>optimized</span>,
                                <span style={{ fontWeight: 700 }}> {nonOptimizedCount}</span> of{' '}
                                {totalCount} {pluralize(totalCount, 'system')} as having a{' '}
                                <span style={{ fontWeight: 700 }}>non-optimal</span> state.
                            </Text>

                            <Text
                                className="pf-v5-u-font-size-xs"
                                component={TextVariants.p}
                                style={{ lineHeight: '50%' }}
                            >
                                <span style={{ fontWeight: 700 }}>{staleCount}</span> of{' '}
                                {totalCount} {pluralize(totalCount, 'system')}{' '}
                                {pluralize(staleCount, 'is', 'are')}{' '}
                                <span style={{ fontWeight: 700 }}>stale*</span>
                            </Text>
                        </TextContent>

                        <TextContent>
                            <Text
                                className="pf-v5-u-font-size-xs"
                                style={{ textAlign: 'right', marginTop: '0 px' }}
                                component="small"
                            >
                              Suggestions for stale systems might no longer apply due to
                              systems not being refreshed in 7 days.*
                            </Text>
                        </TextContent>
                    </StackItem>
                    <StackItem>
                        <Title
                            headingLevel="h5"
                            size="md"
                            style={{
                                marginTop: '6px',
                                color: 'var(--pf-v5-global--danger-color--100)'
                            }}
                        >
                          Breakdown of registered systems
                        </Title>

                        {nonPSICount > 0 && (
                            <Text className="pf-v5-u-font-size-xs">
                                {psiEnabledCount} {pluralize(psiEnabledCount, 'system')} out of
                              a total of {totalCount} {pluralize(totalCount, 'system')} have
                              Kernel Pressure Stall Information enabled. You could get better
                              suggestions for {nonPSICount} {pluralize(nonPSICount, 'system')}{' '}
                              if you enabled Pressure Stall Information. Check the
                              documentation on how to enable PSI on versions RHEL 8 and newer.
                            </Text>
                        )}
                        <Split>
                            <SplitItem>
                                <div
                                    className="pf-v5-u-ml-lg pf-v5-u-mr-lg"
                                    style={{ width: 150, height: 250 }}
                                >
                                    <Bullseye>
                                        <ChartPie
                                            ariaDesc="Systems breakdown"
                                            animate={false}
                                            height={200}
                                            themeColor={ChartThemeColor.multiOrdered}
                                            labels={({ datum }) => `${datum.x}: ${datum.y}`}
                                            data={breakdownData.map(({ x, y }) => ({ x, y }))}
                                            padding={{
                                                top: 0,
                                                right: 0,
                                                left: 0,
                                                bottom: 0
                                            }}
                                        />
                                    </Bullseye>
                                </div>
                            </SplitItem>
                            <SplitItem isFilled>
                                <TableLegend
                                    columns={['State', '# of systems']}
                                    rows={breakdownData.map(({ x, y, percentage }, index) => [
                                        <TextWithColorDot
                                            key={`${x}-index`}
                                            color={breakdownColors?.[index % breakdownColors.length] ?? global_palette_blue_400.value}
                                        >
                                            {x}
                                        </TextWithColorDot>,
                                        `${y} (${percentage}% of total)`
                                    ])}
                                />

                            </SplitItem>
                        </Split>
                        <TextContent>
                            <Text
                                className="pf-v5-u-font-size-xs"
                                style={{ textAlign: 'right', fontSize: 10, margin: '6px 0px' }}
                                component="small"
                            >
                              Description of states are on the third page of the report*
                            </Text>
                        </TextContent>
                    </StackItem>
                    <StackItem>
                        <Title
                            headingLevel="h5"
                            size="md"
                            className="pf-v5-u-danger-color-100"
                        >
                          System performance issues{' '}
                        </Title>
                        <TextContent>
                            <Text className="pf-v5-u-font-size-xs">
                              There are {conditionsCount} system performance issues
                            </Text>
                        </TextContent>
                        <Split>
                            <SplitItem>
                                <div className="pf-v5-u-m-lg" style={{ width: 150, height: 150 }}>
                                    <ChartDonut
                                        subTitle="Conditions"
                                        title={conditionsCount.toString()}
                                        data={performanceData}
                                    />
                                </div>
                            </SplitItem>
                            <SplitItem isFilled>
                                <TableLegend
                                    columns={['Conditions', '# of occurrences']}
                                    rows={performanceData.map(({ x, y }, index) => [
                                        <TextWithColorDot
                                            key={`${x}-index`}
                                            color={blueColorScale?.[index % blueColorScale.length] ?? global_palette_blue_400.value}
                                        >
                                            {x}
                                        </TextWithColorDot>,
                                        y
                                    ])}
                                />
                            </SplitItem>
                        </Split>
                    </StackItem>
                    <StackItem>
                        <Title
                            headingLevel="h5"
                            size="md"
                            className="pf-v5-u-danger-color-100"
                        >
                          Breakdown of occurences
                        </Title>
                        <Grid hasGutter>
                            {[
                                { ...ioConditions, title: 'Disk I/O' },
                                { ...memoryConditions, title: 'RAM' },
                                { ...cpuConditions, title: 'CPU' }
                            ].map(({ title, under_pressure, undersized, oversized }, i) => (
                                <GridItem span={4} key={title}>
                                    <Table isStriped variant="compact">
                                        <Thead>
                                            <Tr>
                                                <Th colSpan={2}>
                                                    <TextWithColorDot color={blueColorScale?.[i] ?? global_palette_blue_400.value}>
                                                        {title}
                                                    </TextWithColorDot>
                                                </Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {under_pressure > 0 ? (
                                                <Tr>
                                                    <Td className="pf-v5-u-font-size-xs pf-v5-u-pt-xs pf-v5-u-pb-xs">
                                                      Under pressure
                                                    </Td>
                                                    <Td className="pf-v5-u-font-size-xs pf-v5-u-pt-xs pf-v5-u-pb-xs">
                                                        {under_pressure}
                                                    </Td>
                                                </Tr>
                                            ) : null}
                                            {undersized > 0 ? (
                                                <Tr>
                                                    <Td className="pf-v5-u-font-size-xs pf-v5-u-pt-xs pf-v5-u-pb-xs">
                                                      Undersized
                                                    </Td>
                                                    <Td className="pf-v5-u-font-size-xs pf-v5-u-pt-xs pf-v5-u-pb-xs">
                                                        {undersized}
                                                    </Td>
                                                </Tr>
                                            ) : null}
                                            {oversized > 0 ? (
                                                <Tr>
                                                    <Td className="pf-v5-u-font-size-xs pf-v5-u-pt-xs pf-v5-u-pb-xs">
                                                      Oversized
                                                    </Td>
                                                    <Td className="pf-v5-u-font-size-xs pf-v5-u-pt-xs pf-v5-u-pb-xs">
                                                        {oversized}
                                                    </Td>
                                                </Tr>
                                            ) : null}
                                        </Tbody>
                                    </Table>
                                </GridItem>
                            ))}
                        </Grid>
                        <TextContent>
                            <Text
                                style={{ textAlign: 'right', fontSize: 10, margin: '6px 0px' }}
                                component="small"
                            >
                              Under pressure conditions are only reported for systems where
                              Kernel Pressure Stall Information is enabled. Check the
                              documentation for details.*
                            </Text>
                            <Text
                                style={{ textAlign: 'right', fontSize: 10, lineHeight: '50%' }}
                                component="small"
                            >
                              Description of conditions are on the third page of the report*
                            </Text>
                        </TextContent>
                    </StackItem>
                </Stack>
            </PageBreak>

            <PageBreak>
                <Stack>
                    <StackItem>
                        {instanceTableDetails.map((instanceTable, index) => (
                            <InstancesTable
                                key={`${index}-${instanceTable.id}`}
                                id={instanceTable.id}
                                instanceDetails={instanceTable.data}
                                heading={instanceTable.heading}
                                description={
                                    staleCount > 0 && instanceTable.id.includes('historical')
                                        ? `${instanceTable.description}${instanceTable.staleDescription}`
                                        : `${instanceTable.description}`
                                }
                            />
                        ))}
                    </StackItem>
                </Stack>
            </PageBreak>
            <Stack className='pf-v5-u-m-xl'>
                <StackItem className='pf-v5-u-mt-xl'>
                    <Title
                        headingLevel="h5"
                        size="md"
                        className="pf-v5-u-danger-color-100 pf-v5-u-mb-md"
                    >
                          Description of states
                    </Title>
                    <DescriptionList data={[
                        {
                            title: 'Optimized',
                            description: 'Performing at an optimal level',
                            icon: (
                                <CheckCircleIcon color={global_success_color_100.value} />
                            )
                        },
                        {
                            title: 'Under pressure',
                            description: 'Peaking occasionally',
                            icon: <TachometerAltIcon />
                        },
                        {
                            title: 'Undersized',
                            description: 'Using more than 80% of system resources',
                            icon: (
                                <AngleDoubleDownIcon
                                    color={global_danger_color_100.value}
                                />
                            )
                        },
                        {
                            title: 'Oversized',
                            description: 'Using less than 20% of system resources',
                            icon: (
                                <AngleDoubleUpIcon color={global_warning_color_100.value} />
                            )
                        },
                        {
                            title: 'Idling',
                            description: 'Consuming less than 5% of resources',
                            icon: <AutomationIcon />
                        },
                        {
                            title: 'Waiting for data',
                            description: 'Data has not been received or is being processed. Initial dataprocessing takes up to 24 hours.',
                            icon: <InProgressIcon color={global_info_color_100.value} />
                        }
                    ]}/>
                </StackItem>
                <StackItem>
                    <Title
                        headingLevel="h5"
                        size="md"
                        className="pf-v5-u-danger-color-100 pf-v5-u-mb-md"
                    >
              Description of conditions
                    </Title>
                    <DescriptionList data={[
                        {
                            title: 'CPU pressure',
                            description: 'CPU registered peaks higher than 20% over several one-minute time periods'
                        },
                        {
                            title: 'Disk I/O pressure',
                            description: 'Disk I/O registered peaks higher than 20% over several one-minute time periods'
                        },
                        {
                            title: 'RAM pressure',
                            description: 'RAM registered peaks higher than 20% over several one-minute time periods'
                        }
                    ]}/>
                </StackItem>
            </Stack>
        </Fragment>
    );
};

export default ExecutiveReport;
