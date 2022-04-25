import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import {  Dl, Dt, Dd } from '@redhat-cloud-services/frontend-components-pdf-generator';
import { Canvas, Text, View } from '@react-pdf/renderer';
import { TachometerAltIconConfig } from '@patternfly/react-icons/dist/js/icons/tachometer-alt-icon';
import { AngleDoubleDownIconConfig } from '@patternfly/react-icons/dist/js/icons/angle-double-down-icon';
import { AngleDoubleUpIconConfig } from '@patternfly/react-icons/dist/js/icons/angle-double-up-icon';
import { AutomationIconConfig } from '@patternfly/react-icons/dist/js/icons/automation-icon';
import { InProgressIconConfig } from '@patternfly/react-icons/dist/js/icons/in-progress-icon';

export const ExecutiveSecondPage = () => {

    return <Fragment key="second-page">
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
                <Dd>Peaking occasionally</Dd>

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
                                path(AngleDoubleDownIconConfig.svgPath).fill('red');
                            }}
                        />
                        <Text>Undersized</Text>
                    </View>
                </Dt>
                <Dd>Using more than 80% of system resources</Dd>

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
                                path(AngleDoubleUpIconConfig.svgPath).fill('#f09800');
                            }}
                        />
                        <Text>Oversized</Text>
                    </View>
                </Dt>
                <Dd>Using less than 20% of system resources</Dd>

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
                                scale(0.008);
                                path(AutomationIconConfig.svgPath).fill('#030303');
                            }}
                        />
                        <Text>Idling</Text>
                    </View>
                </Dt>
                <Dd>Consuming less than 5% of resources</Dd>

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
                                scale(0.008);
                                path(InProgressIconConfig.svgPath).fill('#2B9AF3');
                            }}
                        />
                        <Text>Waiting for data</Text>
                    </View>
                </Dt>
                <Dd>Data has not been received or is being processed. Initial data processing takes up to 24 hours.</Dd>
            </Dl>

            <Text>Description of conditions</Text>
            <Dl>
                <Dt>
                    <View style={{ display: 'flex',
                        flexDirection: 'row' }}>
                        <Text>CPU pressure</Text>
                    </View>
                </Dt>
                <Dd>CPU registered peaks higher than 20% over several one-minute time periods</Dd>

                <Dt>
                    <View style={{ display: 'flex',
                        flexDirection: 'row' }}>
                        <Text>RAM pressure</Text>
                    </View>
                </Dt>
                <Dd>RAM registered peaks higher than 20% over several one-minute time periods</Dd>
            </Dl>
        </Fragment>;
};

