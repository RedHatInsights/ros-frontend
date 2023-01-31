import React from 'react';
import propTypes from 'prop-types';
import { Text, View } from '@react-pdf/renderer';
import {  Dl, Dt, Dd } from '@redhat-cloud-services/frontend-components-pdf-generator';
import { IconCanvas } from './IconCanvas';

export const DescriptionList = ({ id, title, description, iconPath, iconScale, fillColor }) => {

    return (
        <Dl key={id}>
            <Dt>
                <View style={{ display: 'flex',
                    flexDirection: 'row' }}>
                    {
                        iconPath ? <IconCanvas iconPath={iconPath} iconScale={iconScale} fillColor={fillColor}/> : null
                    }
                    <Text>{title}</Text>
                </View>
            </Dt>
            <Dd>{description}</Dd>
        </Dl>
    );
};

DescriptionList.propTypes = {
    id: propTypes.string,
    title: propTypes.string,
    description: propTypes.string,
    iconPath: propTypes.string,
    iconScale: propTypes.number,
    fillColor: propTypes.string
};

