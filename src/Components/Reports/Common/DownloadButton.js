import React from 'react';
import propTypes from 'prop-types';
import { Button } from '@patternfly/react-core';
import { ExportIcon } from '@patternfly/react-icons';

export const DownloadButton = ({ buttonName, onDownloadClick, buttonProps }) => {
    return (
        <Button
            variant="link"
            icon={<ExportIcon />}
            iconPosition="right"
            onClick={() => onDownloadClick()}
            {...buttonProps}
        >
            {buttonName}
        </Button>

    );
};

DownloadButton.propTypes = {
    buttonName: propTypes.string,
    onDownloadClick: propTypes.func,
    buttonProps: propTypes.object
};
