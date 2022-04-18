import React, { useEffect } from 'react';
import { DownloadButton } from '@redhat-cloud-services/frontend-components-pdf-generator';
import { PDF_RECORDS_PER_PAGE, REPORT_NOTIFICATIONS, SYSTEMS_PDF_REPORT_TITLE } from '../../constants';
import { fetchSystems } from '../../Utilities/api';
import { formatData, generateFilterText, getSystemsReportFileName } from './Util';
import propTypes from 'prop-types';
import { SystemsTablePage } from './Common/SystemsTablePage';
import { SystemsFirstPage } from './Common/SystemsFirstPage';
import { useDispatch } from 'react-redux';
import {
    addNotification,
    clearNotifications
} from '@redhat-cloud-services/frontend-components-notifications/redux';

export const DownloadSystemsPDFReport = ({ filters, orderBy, orderHow, ...props }) => {
    const reportFileName = getSystemsReportFileName();
    const dispatch = useDispatch();
    const { start, success, failure } = REPORT_NOTIFICATIONS;

    useEffect(() => {
        dispatch(addNotification(start));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const generateSystemsPDFReport = async (filters, orderBy, orderHow) => {

        const { firstPageCount, otherPageCount } = PDF_RECORDS_PER_PAGE;

        // Table rows
        const fetchSystemParams = {
            filters,
            stateFilter: filters.stateFilter,
            orderBy,
            orderHow
        };

        let systemsResponse;
        try {
            systemsResponse = await fetchSystems(fetchSystemParams);
        }
        catch {
            dispatch(clearNotifications());
            dispatch(addNotification(failure));

            return [];
        }

        const pdfData = formatData(systemsResponse.data, 'pdf');

        // first page description and data props
        const firstPageProps = {
            data: pdfData.splice(0, firstPageCount),
            totalSystems: systemsResponse?.meta?.count,
            filterText: generateFilterText(filters)
        };

        const otherPages = [];

        while (pdfData.length > 0) {
            otherPages.push(pdfData.splice(0, otherPageCount));
        }

        dispatch(clearNotifications());
        dispatch(addNotification(success));

        return [
            <SystemsFirstPage key='first-page' {...firstPageProps} />,
            ...otherPages.map((systemsPage, index) => <SystemsTablePage key={index} data={systemsPage}  page={index + 1}/>)
        ];

    };

    return (
        <div>
            <DownloadButton
                {...props}
                reportName={SYSTEMS_PDF_REPORT_TITLE}
                type=""
                fileName={`${reportFileName}.pdf`}
                size="A4"
                orientation="landscape"
                allPagesHaveTitle={false}
                asyncFunction={() => generateSystemsPDFReport(filters, orderBy, orderHow)}
            />
        </div>
    );

};

DownloadSystemsPDFReport.propTypes = {
    filters: propTypes.object,
    orderBy: propTypes.string,
    orderHow: propTypes.string

};
