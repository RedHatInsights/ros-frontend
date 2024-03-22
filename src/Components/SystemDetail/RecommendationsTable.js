import React from 'react';
import {
    expandable,
    /* data-codemods */
    Tr,
    Th,
    Td
} from '@patternfly/react-table';
import {
    Table,
    TableHeader,
    TableBody
} from '@patternfly/react-table/deprecated';
import propTypes from 'prop-types';
import { flatMap } from 'lodash';
import { EmptyTable } from '@redhat-cloud-services/frontend-components/EmptyTable';
import { EmptyStateDisplay } from '../EmptyStateDisplay/EmptyStateDisplay';
import { CheckCircleIcon, BullseyeIcon, WrenchIcon, LightbulbIcon, ExternalLinkAltIcon } from '@patternfly/react-icons';
import { TextContent, Text, TextVariants } from '@patternfly/react-core';
import './RecommendationsTable.scss';
import { ENABLE_PSI_URL } from '../../constants';

const renderExpandedView = (row) => {
    const { resolution, reason, detected_issues: detectedIssues, current_instance: currentInstance, suggested_instances: suggestedInstances,
        psi_enabled: psiEnabled } = row;

    return (
        <TextContent>
            <Text component={TextVariants.p}>
                <Text className="margin-text-bottom"><BullseyeIcon/><strong className="strong-tag-style">Detected issues</strong></Text>
                {reason}
            </Text>
            { detectedIssues && <Table
                arial-label="Detected issues table"
                variant="compact"
                borders={false}
                className="table-border-top detected-issues-table"
            >
                <TableHeader>
                    <Tr>
                        <Th>Identified issues by ROS</Th>
                    </Tr>
                </TableHeader>
                <TableBody>
                    <Tr>
                        <Td dataLabel="Identified issues by ROS" className="newline tab">
                            {detectedIssues}</Td>
                    </Tr>
                </TableBody>
            </Table> }
            <hr/>
            <Text component={TextVariants.p}>
                <Text className="margin-text-bottom"><WrenchIcon/><strong className="strong-tag-style">Suggestion</strong></Text>
                {resolution}
            </Text>
            { currentInstance && suggestedInstances && <Table
                arial-label="Suggestions table"
                variant="compact"
                borders={false}
                className="table-border-top suggestions-table"
            >
                <TableHeader>
                    <Tr>
                        <Th>Instance</Th>
                        <Th>Suggested instances that fit the load better</Th>
                    </Tr>
                </TableHeader>
                <TableBody>
                    <Tr>
                        <Td dataLabel="Instance">{currentInstance}</Td>
                        <Td dataLabel="Suggested instances that fit the load better" className="newline">
                            {suggestedInstances}</Td>
                    </Tr>
                </TableBody>
            </Table>
            }
            {
                !psiEnabled &&
                <>
                    <hr/>
                    <Text component={TextVariants.p}>
                        <Text className="margin-text-bottom"><LightbulbIcon/>
                            <strong className="strong-tag-style">Related Knowledgebase Article</strong>
                        </Text>
                        {/* eslint-disable-next-line max-len */}
                        <Text component={TextVariants.a} target='_blank' href={ENABLE_PSI_URL}>
                            This suggestion could be improved by enabling PSI <ExternalLinkAltIcon/>
                        </Text>
                    </Text>
                </>
            }
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
