import React from 'react';
import propTypes from 'prop-types';
import { Text, View } from '@react-pdf/renderer';
import {  Dl, Dt, Dd } from '@redhat-cloud-services/frontend-components-pdf-generator';
import { IconCanvas } from './IconCanvas';

export const InstancesTable = ({ key, type, systemCount, description }) => {

    return (
        <View key={key} style={{ display: 'flex', flexDirection: 'row' }}>
            
            <Text style={{ paddingHorizontal: 8 }}>{type}</Text>
            <Text>{systemCount}</Text>
            <Text>{description}</Text>
        </View>
    );
};

InstancesTable.propTypes = {
    key: propTypes.string,
    type: propTypes.string,
    description: propTypes.string,
    systemCount: propTypes.string
};

