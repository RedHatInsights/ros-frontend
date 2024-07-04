import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import { Section, Column } from '@redhat-cloud-services/frontend-components-pdf-generator';
import { SystemsTablePage } from './SystemsTablePage';

export const SystemsFirstPage = ({ data, totalSystems, filterText, isWorkSpaceEnabled }) => {

    return <Fragment key="first-section">
        <Section>
            <Column>
                {`This report identified ${totalSystems} ${totalSystems > 1 ? 'RHEL systems' : 'RHEL system' }. ${filterText}`}
            </Column>
        </Section>
        <SystemsTablePage data={data} page={0} isWorkSpaceEnabled={isWorkSpaceEnabled} />
    </Fragment>;
};

SystemsFirstPage.propTypes = {
    data: propTypes.array,
    totalSystems: propTypes.number,
    filterText: propTypes.string,
    isWorkSpaceEnabled: propTypes.bool
};
