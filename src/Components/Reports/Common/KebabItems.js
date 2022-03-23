import { DropdownItem } from '@patternfly/react-core';
import React from 'react';

export const kebabItemDownloadPDF = (loading, downloadPDFReport, { ...props }) => (
    <DropdownItem key="pdf" component="button" onClick={() => downloadPDFReport(true)} {...props}>
        {loading ? 'Loading...' : 'Export as PDF'}
    </DropdownItem>
);
