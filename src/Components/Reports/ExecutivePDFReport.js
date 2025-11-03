import React, { Fragment, useState } from 'react';
import './ExecutiveePDFReport.scss';
import {
    useAddNotification,
    useClearNotifications
} from '@redhat-cloud-services/frontend-components-notifications/hooks';
import propTypes from 'prop-types';
import { EXECUTIVE_REPORT_FILE_NAME, REPORT_NOTIFICATIONS } from './Constants';
import { Button } from '@patternfly/react-core';
import { ExportIcon } from '@patternfly/react-icons';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

export const DownloadExecutivePDFReport = ({ isDisabled }) => {
    const [loading, setLoading] = useState(false);
    const { requestPdf  } = useChrome();
    const { start, success, failure } = REPORT_NOTIFICATIONS;
    const addNotification = useAddNotification();
    const clearNotifications = useClearNotifications();

    const generateExecutivePDFReport = async () =>{
        const currentDate = `${new Date().toISOString().replace(/[T:]/g, '-').split('.')[0]}-utc.pdf`;
        const filename = `${EXECUTIVE_REPORT_FILE_NAME}${currentDate}`;

        try {
            setLoading(true);
            addNotification(start);

            await requestPdf({
                payload: {
                    module: './PDFTemplates/ExecutiveReport',
                    scope: 'ros',
                    manifestLocation: '/apps/ros/fed-mods.json'
                },
                filename
            });

            clearNotifications();
            addNotification(success);
            setLoading(false);

        }
        catch (error) {
            clearNotifications();
            addNotification(failure);
            setLoading(false);
        }

    };

    return (
        <Fragment>
            <Button
                variant="link"
                icon={<ExportIcon/>}
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
