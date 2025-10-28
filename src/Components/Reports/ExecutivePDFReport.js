import React, { Fragment, useState } from 'react';
import './ExecutiveePDFReport.scss';
import { useDispatch } from 'react-redux';
import {
    addNotification,
    clearNotifications
} from '@redhat-cloud-services/frontend-components-notifications/redux';
import propTypes from 'prop-types';
import { EXECUTIVE_REPORT_FILE_NAME, REPORT_NOTIFICATIONS } from './Constants';
import { Button } from '@patternfly/react-core';
import { ExportIcon } from '@patternfly/react-icons';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

export const DownloadExecutivePDFReport = ({ isDisabled }) => {
    const [loading, setLoading] = useState(false);
    const { requestPdf  } = useChrome();
    const dispatch = useDispatch();
    const { start, success, failure } = REPORT_NOTIFICATIONS;

    const generateExecutivePDFReport = async () =>{
        const currentDate = `${new Date().toISOString().replace(/[T:]/g, '-').split('.')[0]}-utc.pdf`;
        const filename = `${EXECUTIVE_REPORT_FILE_NAME}${currentDate}`;

        try {
            setLoading(true);
            dispatch(addNotification(start));

            await requestPdf({
                payload: {
                    module: './PDFTemplates/ExecutiveReport',
                    scope: 'ros',
                    manifestLocation: '/apps/ros/fed-mods.json'
                },
                filename
            });

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
                icon={ExportIcon}
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
