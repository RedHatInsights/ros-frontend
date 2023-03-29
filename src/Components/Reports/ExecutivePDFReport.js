import React, { Fragment, useState } from 'react';
import './ExecutiveePDFReport.scss';
import { fetchExecutiveReport } from '../../Utilities/api';
import { useDispatch } from 'react-redux';
import {
    addNotification,
    clearNotifications
} from '@redhat-cloud-services/frontend-components-notifications/redux';
import propTypes from 'prop-types';
import { EXECUTIVE_REPORT_FILE_NAME, REPORT_NOTIFICATIONS } from './Constants';
import { Button } from '@patternfly/react-core';
import { ExportIcon } from '@patternfly/react-icons';

export const DownloadExecutivePDFReport = ({ isDisabled }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { start, success, failure } = REPORT_NOTIFICATIONS;

    const generateExecutivePDFReport = async () =>{
        const currentDate = `${new Date().toISOString().replace(/[T:]/g, '-').split('.')[0]}-utc.pdf`;
        const fileName = `${EXECUTIVE_REPORT_FILE_NAME}${currentDate}`;

        try {
            setLoading(true);
            dispatch(addNotification(start));

            const executiveReportBlob = await fetchExecutiveReport();
            const url = window.URL.createObjectURL(executiveReportBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();

            dispatch(clearNotifications());
            dispatch(addNotification(success));
            setLoading(false);

        }
        catch (error) {
            dispatch(clearNotifications());
            dispatch(addNotification(failure));
            setLoading(false);
        }

    };

    return (
        <Fragment>
            <Button
                variant="link"
                icon={<ExportIcon />}
                iconPosition="left"
                onClick={() => generateExecutivePDFReport()}
                isDisabled={loading || isDisabled}
                className='downloadButtonOverride'>
                {  loading
                    ? 'Loading...'
                    : 'Download executive report'
                }
            </Button>
        </Fragment>
    );
};

DownloadExecutivePDFReport.propTypes = {
    isDisabled: propTypes.bool
};
