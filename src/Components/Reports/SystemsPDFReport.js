import React, { Fragment } from 'react';
import { DownloadButton, Section, Column, Table } from '@redhat-cloud-services/frontend-components-pdf-generator';
import { SYSTEMS_PDF_REPORT_FILE_NAME, SYSTEMS_PDF_REPORT_NAME } from '../../constants';
import { fetchSystems } from '../../Utilities/api';
import { buildSystemsHeader, buildSystemsRows } from './Util';

const generateSystemsPDFReport = async () => {
    const systemsResponse = await fetchSystems();

    const systemsRows = buildSystemsRows(systemsResponse.data);
    const systemsHeader = buildSystemsHeader();

    const totalSystems = systemsResponse?.meta?.count;

    return [
        <Fragment key="first-section">
            <Section>
                <Column>
                    {`This report identified ${totalSystems} RHEL systems.\n Filters applied\nState: All\t\t\t\t`}
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

export const DownloadSystemsPDFReport = ({ filters, ...props }) => {
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
                asyncFunction={generateSystemsPDFReport}
            />
        </div>
    );

};
