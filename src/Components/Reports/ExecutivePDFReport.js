import React, { Fragment, useState } from 'react';
import './ExecutiveePDFReport.scss';
import { fetchExecutiveReport } from '../../Utilities/api';
import { useDispatch } from 'react-redux';
import {
    addNotification,
    clearNotifications
} from '@redhat-cloud-services/frontend-components-notifications/redux';
import propTypes from 'prop-types';
import { REPORT_NOTIFICATIONS } from './Constants';
import { DownloadButton } from './Common/DownloadButton';

export const DownloadExecutivePDFReport = ({ isDisabled }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { start, success, failure } = REPORT_NOTIFICATIONS;

    const generateExecutivePDFReport = () =>{
        const fileName = `Resource-Optimization-Executive-Report--${new Date().toISOString().replace(/[T:]/g, '-').split('.')[0]}-utc.pdf`;

        setLoading(true);
        dispatch(addNotification(start));

        fetch('/api/crc-pdf-generator/v1/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                service: 'ros',
                template: 'executiveReport'
            })
        })
        .then((response) => response.blob())
        .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();

            dispatch(clearNotifications());
            dispatch(addNotification(success));
            setLoading(false);
        });

    };

    return (
        <Fragment>
            <DownloadButton
                buttonName="Download Executive Report"
                onDownloadClick={() => generateExecutivePDFReport() }
                buttonProps={{
                    className: 'downloadButtonOverride'
                }}
            />
        </Fragment>
    );
};

DownloadExecutivePDFReport.propTypes = {
    isDisabled: propTypes.bool
};
