import React from 'react';
import propTypes from 'prop-types';
import { Text, View } from '@react-pdf/renderer';
import {  Dl, Dt, Dd } from '@redhat-cloud-services/frontend-components-pdf-generator';
import { IconCanvas } from './IconCanvas';

export const DescriptionList = ({ key, title, description, iconPath, iconScale, fillColor }) => {

    return (
        <Dl key={key}>
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
    key: propTypes.string,
    title: propTypes.string,
    description: propTypes.string,
    iconPath: propTypes.string,
    iconScale: propTypes.number,
    fillColor: propTypes.string
};

