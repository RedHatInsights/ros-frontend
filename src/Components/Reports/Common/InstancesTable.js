import React from 'react';
import propTypes from 'prop-types';
import { Text, View } from '@react-pdf/renderer';
import {  Dl, Dt, Dd } from '@redhat-cloud-services/frontend-components-pdf-generator';
import { IconCanvas } from './IconCanvas';

export const InstancesTable = ({ key, type, systemCount, description }) => {

    return (
        <Dl key={key}>
            <Dt>
                <View>
                    <Text>{type}</Text>
                </View>
            </Dt>
            <Dd>{systemCount}</Dd>
            <Dd>{description}</Dd>
        </Dl>
    );
};

InstancesTable.propTypes = {
    key: propTypes.string,
    type: propTypes.string,
    description: propTypes.string,
    systemCount: propTypes.string
};

