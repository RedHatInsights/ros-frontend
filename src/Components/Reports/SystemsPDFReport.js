import React, { Fragment } from 'react';
import { Text } from '@react-pdf/renderer';
import { DownloadButton, Section, Column, Table } from '@redhat-cloud-services/frontend-components-pdf-generator';
import { SYSTEMS_PDF_REPORT_FILE_NAME, SYSTEMS_PDF_REPORT_NAME } from '../../constants';
import { fetchSystems } from '../../Utilities/api';
import { generateFilterText, responseToPDFData } from './Util';
import propTypes from 'prop-types';
import styles from './Common/styles';

const columnBuilder = ({ value, style }) => <Text key={value} style={style}>{value}</Text>;

const buildSystemsHeader = () => {

    const headerContent = ['Name', 'OS', 'CPU utilization', 'Memory utilization', 'I/O utilization', 'Suggestions', 'State', 'Last reported'];
    const formattedHeader = headerContent.map(item => {
        let styleArr = item === 'Name' ? [styles.systemNameCell] : [styles.headerCell];
        return columnBuilder({ value: item, style: styleArr });
    });

    return formattedHeader;

};

const buildSystemsRows = (rowsData) => {
    const systemsRows =  rowsData.map((rowItem) => {
        const formattedRows = rowItem.map((rowValue, index) => {
            let styleArr = index === 0 ? [styles.systemNameCell] : [styles.bodyCell];
            return columnBuilder({ value: rowValue, style: styleArr });
        })
        return formattedRows;
    })

    return systemsRows;
};

const generateSystemsPDFReport = async (filters, orderBy, orderHow) => {
    // Table header
    const systemsHeader = buildSystemsHeader();

    // Table rows
    const fetchSystemParams = {
        filters,
        stateFilter: filters.stateFilter,
        orderBy,
        orderHow
    };
    const systemsResponse = await fetchSystems(fetchSystemParams);
    const pdfData = responseToPDFData(systemsResponse.data);

    const systemsRows = buildSystemsRows(pdfData);
   
    // description text
    const totalSystems = systemsResponse?.meta?.count;
    const filterText = generateFilterText(filters);

    return [
        <Fragment key="first-section">
            <Section>
                <Column>
                    {`This report identified ${totalSystems} ${totalSystems > 1 ? 'RHEL systems' : 'RHEL system' }. ${filterText}`}
                </Column>
            </Section>
            <Section>
                <Column>
                    <Table
                        withHeader
                        rows={[
                            systemsHeader,
                            ... systemsRows
                        ]}
                    />
                </Column>
            </Section>
        </Fragment>
    ];
};

export const DownloadSystemsPDFReport = ({ filters, orderBy, orderHow, ...props }) => {
    const currentDate = `${new Date().toISOString().replace(/[T:]/g, '-').split('.')[0]}-utc`;
    const reportFileName = `${SYSTEMS_PDF_REPORT_FILE_NAME}${currentDate}`;

    return (
        <div>
            <DownloadButton
                {...props}
                reportName={SYSTEMS_PDF_REPORT_NAME}
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

columnBuilder.propTypes = {
    value: propTypes.string,
    style: propTypes.array
};
