import React, { Fragment } from 'react';
import { Text } from '@react-pdf/renderer';
import { DownloadButton, Section, Column, Table } from '@redhat-cloud-services/frontend-components-pdf-generator';
import { SYSTEMS_PDF_REPORT_FILE_NAME, SYSTEMS_PDF_REPORT_NAME } from '../../constants';
import { fetchSystems } from '../../Utilities/api';
import { buildSystemsHeader, buildSystemsRows, generateFilterText } from './Util';
import propTypes from 'prop-types';

export const columnBuilder = ({ value, style }) => <Text key={value} style={style}>{value}</Text>;

const generateSystemsPDFReport = async (filters, orderBy, orderHow) => {

    const fetchSystemParams = {
        filters,
        stateFilter: filters.stateFilter,
        orderBy,
        orderHow
    };
    const systemsResponse = await fetchSystems(fetchSystemParams);

    const systemsRows = buildSystemsRows(systemsResponse.data);
    const systemsHeader = buildSystemsHeader();

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
