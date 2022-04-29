import { downloadFile } from '@redhat-cloud-services/frontend-components-utilities/helpers/helpers';
import { REPORT_NOTIFICATIONS } from '../../constants';
import { fetchSystems } from '../../Utilities/api';
import { getSystemsReportFileName, responseToCSVData, responseToJSONData } from './Util';

export const downloadReport = async (format, filters, orderBy, orderHow, showNotification, clearNotification) => {

    const fileName = getSystemsReportFileName();
    const { start, success, failure } = REPORT_NOTIFICATIONS;

    showNotification(start);

    const fetchSystemParams = {
        filters,
        stateFilter: filters.stateFilter,
        osFilter: filters.osFilter,
        orderBy,
        orderHow
    };

    try {
        const systemsResponse = await fetchSystems(fetchSystemParams);

        const data = format === 'json' ? responseToJSONData(systemsResponse.data) : responseToCSVData(systemsResponse.data);

        downloadFile(data, fileName, format);

        clearNotification();
        showNotification(success);
    }
    catch (error) {
        clearNotification();
        showNotification(failure);

        throw `${error}`;
    }

};
