import { downloadFile } from '@redhat-cloud-services/frontend-components-utilities/helpers/helpers';
import { REPORT_NOTIFICATIONS } from './Constants';
import { fetchSystems, fetchSystemsPDFReport } from '../../Utilities/api';
import { getSystemsReportFileName, responseToCSVData, responseToJSONData } from './Util';

export const downloadSystemsReport = async (format, filters, orderBy, orderHow,
    showNotification, clearNotification) => {

    const fileName = getSystemsReportFileName();
    const { start, success, failure } = REPORT_NOTIFICATIONS;

    showNotification(start);

    const fetchSystemParams = {
        filters,
        stateFilter: filters.stateFilter,
        osFilter: filters.osFilter,
        groupFilter: filters.groupFilter,
        orderBy,
        orderHow
    };

    try {

        if (format === 'json' || format === 'csv') {
            const systemsResponse = await fetchSystems(fetchSystemParams);

            const data = format === 'json' ? responseToJSONData(systemsResponse.data) : responseToCSVData(systemsResponse.data);

            downloadFile(data, fileName, format);
        }

        if (format === 'pdf') {
            const systemsReportBlob = await fetchSystemsPDFReport(fetchSystemParams);
            const url = window.URL.createObjectURL(systemsReportBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
        }

        clearNotification();
        showNotification(success);
    }
    catch (error) {
        clearNotification();
        showNotification(failure);

        throw `${error}`;
    }

};
