
import { REPORT_NOTIFICATIONS } from './Constants';
import { fetchSystemsReport } from '../../Utilities/api';
import { getSystemsReportFileName } from './Util';
import propTypes from 'prop-types';

export const DownloadSystemsPDFReport = async (filters, orderBy, orderHow, showNotification, clearNotification) => {
    const reportFileName = getSystemsReportFileName();
    const { start, success, failure } = REPORT_NOTIFICATIONS;

        try {
            showNotification(start);
            const fetchSystemParams = {
                filters,
                stateFilter: filters.stateFilter,
                osFilter: filters.osFilter,
                orderBy,
                orderHow
            };

            const systemsReportBlob = await fetchSystemsReport(fetchSystemParams);
            const url = window.URL.createObjectURL(systemsReportBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = reportFileName;
            document.body.appendChild(a);
            a.click();
            a.remove();

            clearNotification();
            showNotification(success);
        }
        catch {
            clearNotifications();
            showNotification(failure);
        }

};

DownloadSystemsPDFReport.propTypes = {
    filters: propTypes.object,
    orderBy: propTypes.string,
    orderHow: propTypes.string

};
