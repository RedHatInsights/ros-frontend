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
import { ExecutiveThirdPage } from './Common/ExecutiveThirdPage';
import propTypes from 'prop-types';
import { REPORT_NOTIFICATIONS } from '../../constants';

export const DownloadExecutivePDFReport = ({ isDisabled }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { start, success, failure } = REPORT_NOTIFICATIONS;

    const generateExecutivePDFReport =  async () =>{
        try {
            setLoading(true);
            dispatch(addNotification(start));

            const executiveReportResponse = await fetchExecutiveReport();

            dispatch(clearNotifications());
            dispatch(addNotification(success));
            setLoading(false);

            return [
                <ExecutiveFirstPage key='executive-first-page' data={executiveReportResponse} />,
                <ExecutiveSecondPage key='executive-second-page' data={executiveReportResponse} />,
                <ExecutiveThirdPage key='executive-third-page' />
            ];

        }
        catch (error) {
            dispatch(clearNotifications());
            dispatch(addNotification(failure));
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
                fileName={`Resource-Optimization-Executive-Report--${new Date().toISOString().replace(/[T:]/g, '-').split('.')[0]}-utc.pdf`}
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

DownloadExecutivePDFReport.propTypes = {
    isDisabled: propTypes.bool
};
