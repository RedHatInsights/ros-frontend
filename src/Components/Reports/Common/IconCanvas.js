import React from 'react';
import propTypes from 'prop-types';
import { Canvas } from '@react-pdf/renderer';
import { CircleIconConfig } from '@patternfly/react-icons/dist/js/icons/circle-icon';

export const IconCanvas = ({ width = 15, height = 10, padding = 2,
    iconScale = 0.014, iconPath = CircleIconConfig.svgPath, fillColor = '#8BC1F7' }) => {

    return (
        <Canvas
            style={{
                width,
                height,
                padding
            }}
            paint={({ path, scale }) => {
                scale(iconScale);
                path(iconPath).fill(fillColor);
            }}
        />
    );
};

IconCanvas.propTypes = {
    width: propTypes.number,
    height: propTypes.number,
    padding: propTypes.number,
    iconScale: propTypes.number,
    iconPath: propTypes.string,
    fillColor: propTypes.string
};
