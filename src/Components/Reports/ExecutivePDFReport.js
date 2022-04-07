
import React, { Fragment } from 'react';
import { DownloadButton, Section, Column, Chart, Table, Dl, Dt, Dd } from '@redhat-cloud-services/frontend-components-pdf-generator';
import { Canvas, Text, View } from '@react-pdf/renderer';
import { CircleIconConfig } from '@patternfly/react-icons/dist/js/icons/circle-icon';
import { TachometerAltIconConfig } from '@patternfly/react-icons/dist/js/icons/tachometer-alt-icon';

const renderExecutiveReport = () => {

    return [
        <Fragment key="first-section">
            <Section>
                <Column>
                    {'This executive summary summarizes the performance for the registered systems included in the resource optimization service.'}
                </Column>
                <Column>
                    {'There are 123 systems registered in the resource optimization service.'}
                </Column>
                <Text>Number of systems in a non-optimal state</Text>
                <Column>
                    {'The resource optimization service identified 54 of 123 registered systems as having a non-optimal state.'}
                </Column>
            </Section>

        </Fragment>
    ];
};

export const DownloadExecutivePDFReport = ({ props }) => {

    return (
        <Fragment>
            <DownloadButton
                {...props}
                reportName={'Resource optimization service report'}
                type=""
                fileName={`executive_report.pdf`}
                size="A4"
                allPagesHaveTitle={false}
                pages={[
                    <Fragment key="first-page">
                        <Text>
                            This executive summary summarizes the performance for the registered systems included in the resource optimization service.
                        </Text>
                        <Text>There are 123 systems registered in the resource optimization service.</Text>

                        <Section>
                            <Text>Number of systems in a non-optimal state</Text>
                        </Section>
                        <Section>
                            <Text>The resource optimization service identified 54 of 123 registered systems as having a non-optimal state.</Text>
                        </Section>

                        <Section>

                            <Column>
                                <Chart
                                    chartType="pie"
                                    subTitle="State"
                                    title="100"
                                    data={[{ x: 'Under pressure', y: 51 }, { x: 'Undersized', y: 29 }, { x: 'Oversized', y: 10 }, { x: 'Idling', y: 2 }, { x: 'Waiting for data', y: 1 }]}
                                    colorSchema={'multi'}
                                    legendHeader={'State'}
                                    showLabels={false}
                                />
                            </Column>
                            <Column>
                                <Table
                                    withHeader
                                    rows={[
                                        ['# of systems'],
                                        ['13 (51% of total)'],
                                        ['13 (10% of total)'],
                                        ['3 (6% of total)'],
                                        ['2 (2% of total)'],
                                        ['1 (1% of total)']
                                    ]}
                                />
                            </Column>
                        </Section>

                        <Section>
                            <Text>Identified condtions</Text>
                        </Section>
                        <Text>There are 123 systems registered in the resource optimization service, of which 54 present a total of 109 conditions.</Text>

                        <Section>
                            <Column>
                                <Chart
                                    chartType="bar"
                                    subTitle="State"
                                    title="100"
                                    data={[{ name: 'Under pressure', x: 'Under pressure', y: 51 }, { name: 'Undersized', x: 'Undersized', y: 29 }, { name: 'Oversized', x: 'Oversized', y: 10 }]}
                                    colorSchema={'blue'}
                                    legend={false}
                                    showLabels={false}
                                />

                            </Column>

                            <Column>
                                <Table
                                    withHeader
                                    rows={[
                                        [
                                            <View style={{ display: 'flex',
                                                flexDirection: 'row' }}>
                                                <Canvas
                                                    style={{
                                                        width: 15,
                                                        height: 10,
                                                        padding: 2
                                                    }}
                                                    paint={({ path, scale }) => {
                                                        scale(0.014);
                                                        path(CircleIconConfig.svgPath).fill('#7dc3e8');
                                                    }}
                                                />
                                                <Text>Disk I/O</Text>
                                            </View>

                                        ],
                                        ['Underpressure', '24'],
                                        ['Undersized', '9']
                                    ]}
                                />
                            </Column>
                        </Section>

                        <Section>
                            <Column>
                                <Chart
                                    chartType="bar"
                                    subTitle="State"
                                    title="100"
                                    data={[{ name: 'Under pressure', x: 'Under pressure', y: 51 }, { name: 'Undersized', x: 'Undersized', y: 29 }, { name: 'Oversized', x: 'Oversized', y: 10 }]}
                                    colorSchema={'blue'}
                                    legend={false}
                                    showLabels={false}
                                />

                            </Column>

                            <Column>
                                <Table
                                    withHeader
                                    rows={[
                                        [
                                            <View style={{ display: 'flex',
                                                flexDirection: 'row' }}>
                                                <Canvas
                                                    style={{
                                                        width: 15,
                                                        height: 10,
                                                        padding: 2
                                                    }}
                                                    paint={({ path, scale }) => {
                                                        scale(0.014);
                                                        path(CircleIconConfig.svgPath).fill('#002235');
                                                    }}
                                                />
                                                <Text>CPU</Text>
                                            </View>

                                        ],
                                        ['Underpressure', '24'],
                                        ['Undersized', '9']
                                    ]}
                                />
                            </Column>
                        </Section>

                        <Section>
                            <Text>Breakdown of occurences</Text>
                        </Section>

                        <Section>
                            <Column>
                                <Table
                                    withHeader
                                    rows={[
                                        [
                                            <View style={{ display: 'flex',
                                                flexDirection: 'row' }}>
                                                <Canvas
                                                    style={{
                                                        width: 15,
                                                        height: 10,
                                                        padding: 2
                                                    }}
                                                    paint={({ path, scale }) => {
                                                        scale(0.014);
                                                        path(CircleIconConfig.svgPath).fill('#7dc3e8');
                                                    }}
                                                />
                                                <Text>Disk I/O</Text>
                                            </View>

                                        ],
                                        ['Underpressure', '24'],
                                        ['Undersized', '9']
                                    ]}
                                />
                            </Column>
                            <Column style={{ flex: 0.2 }}>
                            </Column>
                            <Column>
                                <Table
                                    withHeader
                                    rows={[
                                        [
                                            <View style={{ display: 'flex',
                                                flexDirection: 'row' }}>
                                                <Canvas
                                                    style={{
                                                        width: 15,
                                                        height: 10,
                                                        padding: 2
                                                    }}
                                                    paint={({ path, scale }) => {
                                                        scale(0.014);
                                                        path(CircleIconConfig.svgPath).fill('#00659c');
                                                    }}
                                                />
                                                <Text>RAM</Text>
                                            </View>

                                        ],
                                        ['Underpressure', '24'],
                                        ['Undersized', '9']
                                    ]}
                                />
                            </Column>
                            <Column style={{ flex: 0.2 }}>
                            </Column>
                            <Column>
                                <Table
                                    withHeader
                                    rows={[
                                        [
                                            <View style={{ display: 'flex',
                                                flexDirection: 'row' }}>
                                                <Canvas
                                                    style={{
                                                        width: 15,
                                                        height: 10,
                                                        padding: 2
                                                    }}
                                                    paint={({ path, scale }) => {
                                                        scale(0.014);
                                                        path(CircleIconConfig.svgPath).fill('#002235');
                                                    }}
                                                />
                                                <Text>CPU</Text>
                                            </View>

                                        ],
                                        ['Underpressure', '24'],
                                        ['Undersized', '9']
                                    ]}
                                />
                            </Column>
                        </Section>
                    </Fragment>,

                    <Fragment key="second-page">
                        <Text>Description of states</Text>
                        <Dl>
                            <Dt>
                                <View style={{ display: 'flex',
                                    flexDirection: 'row' }}>
                                    <Canvas
                                        style={{
                                            width: 15,
                                            height: 10,
                                            padding: 2
                                        }}
                                        paint={({ path, scale }) => {
                                            scale(0.014);
                                            path(TachometerAltIconConfig.svgPath).fill('#030303');
                                        }}
                                    />
                                    <Text>Under pressure</Text>
                                </View>
                            </Dt>
                            <Dd>Optimized usage, but experiencing occasional peaks</Dd>
                        </Dl>
                    </Fragment>
                ]}
            />
        </Fragment>
    );
};
