import React from 'react';
import { DownloadButton } from '@redhat-cloud-services/frontend-components-pdf-generator';
import { PDF_REPORT_PER_PAGE, SYSTEMS_PDF_REPORT_TITLE } from '../../constants';
import { fetchSystems } from '../../Utilities/api';
import { formatData, generateFilterText, getSystemsReportFileName } from './Util';
import propTypes from 'prop-types';
import { SystemsTablePage } from './Common/SystemsTablePage';
import { SystemsFirstPage } from './Common/SystemsFirstPage';

const generateSystemsPDFReport = async (filters, orderBy, orderHow) => {

    const { systemsReportFirstPage, systemsReportRestPages } = PDF_REPORT_PER_PAGE;

    // Table rows
    const fetchSystemParams = {
        filters,
        stateFilter: filters.stateFilter,
        orderBy,
        orderHow
    };
    const systemsResponse = await fetchSystems(fetchSystemParams);
    const pdfData = formatData(systemsResponse.data, 'pdf');
  
    // first page description and data
    const totalSystems = systemsResponse?.meta?.count;
    const filterText = generateFilterText(filters);
    const firstPageData =  pdfData.splice(0, systemsReportFirstPage);

    //const firstPage = SystemsFirstPage({ data: firstPageData, totalSystems, filterText });
    const firstPage = <SystemsFirstPage
        data={firstPageData}
        totalSystems={totalSystems}
        filterText={filterText} />;

    const otherPages = [];

    while (pdfData.length > 1) {
        otherPages.push(pdfData.splice(0, systemsReportRestPages));
    }

    return [
        firstPage,
        ...otherPages.map((systemsPage, index) => <SystemsTablePage key={index} data={systemsPage}  page={index + 1}/>)
    ];

};

export const DownloadSystemsPDFReport = ({ filters, orderBy, orderHow, ...props }) => {
    const reportFileName = getSystemsReportFileName();

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
