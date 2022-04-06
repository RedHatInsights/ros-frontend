import { downloadFile } from '@redhat-cloud-services/frontend-components-utilities/helpers/helpers';
import { fetchSystems } from '../../Utilities/api';
import { getSystemsReportFileName, responseToCSVData, responseToJSONData } from './Util';

export const downloadReport = async (format, filters, orderBy, orderHow) => {

    const fileName = getSystemsReportFileName();

    const fetchSystemParams = {
        filters,
        stateFilter: filters.stateFilter,
        orderBy,
        orderHow
    };

    const systemsResponse = await fetchSystems(fetchSystemParams);

    const data = format === 'json' ? responseToJSONData(systemsResponse.data) : responseToCSVData(systemsResponse.data);

    downloadFile(data, fileName, format);

};
