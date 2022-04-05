import React from 'react';
import { Table, TableHeader, TableBody, expandable, TableComposable, Thead, Tr, Th, Td, Tbody } from '@patternfly/react-table';
import propTypes from 'prop-types';
import { flatMap } from 'lodash';
import { EmptyTable } from '@redhat-cloud-services/frontend-components/EmptyTable';
import { EmptyStateDisplay } from '../EmptyStateDisplay/EmptyStateDisplay';
import { CheckCircleIcon, BullseyeIcon, WrenchIcon } from '@patternfly/react-icons';
import { TextContent, Text, TextVariants } from '@patternfly/react-core';
import './RecommendationsTable.scss';

const renderExpandedView = (row) => {
    return (
        <TextContent>
            <Text component={TextVariants.p}>
                <Text className="margin-text-bottom"><BullseyeIcon/><strong className="strong-tag-style">Detected issues</strong></Text>
                {row.reason}
            </Text>
            {row.detected_issues && <TableComposable
                arial-label="Detected issues table"
                variant="compact"
                borders={false}
                className="table-border-top detected-issues-table"
            >
                <Thead>
                    <Tr>
                        <Th className="Th-tag-style">Identified issues by ROS</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td dataLabel="Identified issues by ROS" className="newline tab">{row.detected_issues}</Td>
                    </Tr>
                </Tbody>
            </TableComposable> }
            <hr/>
            <Text component={TextVariants.p}>
                <Text className="margin-text-bottom"><WrenchIcon/><strong className="strong-tag-style">Suggestion</strong></Text>
                {row.resolution}
            </Text>
            <TableComposable
                arial-label="Suggestions table"
                variant="compact"
                borders={false}
                className="table-border-top suggestions-table"
            >
                <Thead>
                    <Tr>
                        <Th className="Th-tag-style">Instance</Th>
                        <Th className="Th-tag-style">Suggested instances that fit the load better</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td dataLabel="Instance">{row.current_instance}</Td>
                        <Td dataLabel="Suggested instances that fit the load better" className="newline">{row.suggested_instances}</Td>
                    </Tr>
                </Tbody>
            </TableComposable>
        </TextContent>
    );
};

class RecommendationsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [{ title: 'Name', cellFormatters: [expandable] }],
            rows: this.createRows()
        };
        this.onCollapse = this.onCollapse.bind(this);
    }

    onCollapse(event, rowKey, isOpen) {
        const { rows } = this.state;
        /**
         * Please do not use rowKey as row index for more complex tables.
         * Rather use some kind of identifier like ID passed with each row.
         */
        rows[rowKey].isOpen = isOpen;
        this.setState({
            rows
        });
    }

    createRows() {
        const rowsData = this.props.recommendations;
        if (rowsData && rowsData.length !== 0) {
            return flatMap(rowsData, (row, index) => {
                return [
                    {
                        id: index,
                        isOpen: index === 0 ? true : false,
                        cells: [{ title: row.description }]
                    },
                    {
                        cells: [{ title: renderExpandedView(row) }],
                        parent: index * 2
                    }
                ];
            });
        } else {
            return [
                {
                    heightAuto: true,
                    cells: [
                        {
                            props: { colSpan: 7 },
                            title: <EmptyTable className='recs-table-empty'>
                                <EmptyStateDisplay title="No suggestions"
                                    text={[
                                        'There are no suggestions for this system.'
                                    ]}
                                    icon={CheckCircleIcon}/>
                            </EmptyTable>
                        }
                    ]
                }
            ];
        }
    }

    render() {
        const { columns, rows } = this.state;
        return (
            <Table aria-label="Expandable table" onCollapse={this.onCollapse}
                variant='compact'
                rows={rows} cells={columns} className="ros-recommendations-table">
                <TableHeader />
                <TableBody />
            </Table>
        );

    }
}

RecommendationsTable.propTypes = {
    recommendations: propTypes.array
};

export default RecommendationsTable;
