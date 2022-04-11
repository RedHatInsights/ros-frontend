import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import { Section, Column, Table } from '@redhat-cloud-services/frontend-components-pdf-generator';
import { Text } from '@react-pdf/renderer';
import styles from './styles';

const columnBuilder = ({ value, style, key }) => <Text key={key} style={style}>{value}</Text>;

const buildSystemsHeader = () => {

    const headerContent = ['Name', 'OS', 'CPU utilization', 'Memory utilization', 'I/O utilization', 'Suggestions', 'State', 'Last reported'];
    const formattedHeader = headerContent.map((item, index) => {
        let styleArr = item === 'Name' ? [styles.systemNameCell] : [styles.headerCell];
        return columnBuilder({ value: item, style: styleArr, key: `${index}-${item}` });
    });

    return formattedHeader;

};

const buildSystemsRows = (rowsData) => {
    const systemsRows =  rowsData.map((rowItem) => {
        const formattedRows = rowItem.map((rowValue, index) => {
            let styleArr = index === 0 ? [styles.systemNameCell] : [styles.bodyCell];
            return columnBuilder({ value: rowValue, style: styleArr, key: `${index}-${rowValue}` });
        });
        return formattedRows;
    });

    return systemsRows;
};

export const SystemsTablePage = ({ data, page }) => {

    // Table header
    const systemsHeader = buildSystemsHeader();

    // Table Rows
    const systemsRows = buildSystemsRows(data);

    return <Fragment key={page}>
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
    </Fragment>;

};

SystemsTablePage.propTypes = {
    data: propTypes.array,
    page: propTypes.number
};

columnBuilder.propTypes = {
    value: propTypes.string,
    style: propTypes.array,
    key: propTypes.string
};
