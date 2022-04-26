import React, { Fragment, useState } from 'react';
import { DownloadButton } from '@redhat-cloud-services/frontend-components-pdf-generator';
import ExportIcon from '@patternfly/react-icons/dist/js/icons/export-icon';
import './ExecutiveePDFReport.scss';
import { fetchExecutiveReport } from '../../Utilities/api';
import { useDispatch } from 'react-redux';
import {
    addNotification,
    clearNotifications
} from '@redhat-cloud-services/frontend-components-notifications/redux';
import { ExecutiveFirstPage } from './Common/ExecutiveFirstPage';
import { ExecutiveSecondPage } from './Common/ExecutiveSecondPage';

export const DownloadExecutivePDFReport = ({ isDisabled }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const generateExecutivePDFReport =  async () =>{
        try {
            setLoading(true);
            dispatch(addNotification({
                variant: 'info',
                title: 'Generating data. Download may take a moment to start.'
            }));

            const executiveReportResponse = await fetchExecutiveReport();

            console.log('Executive Response:', executiveReportResponse);

            dispatch(clearNotifications());
            dispatch(addNotification({
                variant: 'success',
                title: 'Export successful'
            }));
            setLoading(false);

            return [
                <ExecutiveFirstPage data={executiveReportResponse} />,
                <ExecutiveSecondPage />
            ];

        }
        catch (error) {
            dispatch(clearNotifications());
            dispatch(addNotification({
                variant: 'danger',
                autoDismiss: false,
                title: 'Export failed. Please try exporting again.'
            }));
        }

    };

    return (
        <Fragment>
            <DownloadButton
                label={
                    loading
                        ? 'Loading...'
                        : 'Download executive report'
                }
                reportName={'Resource optimization service report'}
                type=""
                fileName={`Resource-Optimization-Executive-Report--${new Date().toUTCString().replace(/ /g, '-')}.pdf`}
                size="A4"
                allPagesHaveTitle={false}
                asyncFunction={() => generateExecutivePDFReport()}
                buttonProps={{
                    variant: 'link',
                    component: 'a',
                    icon: <ExportIcon className="iconOverride" />,
                    className: 'downloadButtonOverride',
                    isAriaDisabled: isDisabled,
                    ...(loading ? { isDisabled: true } : null)
                }}
            />
        </Fragment>
    );
};
