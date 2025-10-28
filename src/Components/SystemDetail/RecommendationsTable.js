import React, { Fragment } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    ExpandableRowContent
} from '@patternfly/react-table';
import propTypes from 'prop-types';
import { flatMap } from 'lodash';
import { EmptyTable } from '@redhat-cloud-services/frontend-components/EmptyTable';
import { EmptyStateDisplay } from '../EmptyStateDisplay/EmptyStateDisplay';
import { CheckCircleIcon, BullseyeIcon, WrenchIcon, LightbulbIcon, ExternalLinkAltIcon } from '@patternfly/react-icons';
import { Content, ContentVariants } from '@patternfly/react-core';
import './RecommendationsTable.scss';
import { ENABLE_PSI_URL } from '../../constants';

class RecommendationsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: true
        };
    }

    onExpandToggle = () => {
        this.setState({ expanded: !this.state.expanded });
    };

    renderExpandedView = (row, index) => {
        const { description, resolution, reason, detected_issues: detectedIssues,
            current_instance: currentInstance, suggested_instances: suggestedInstances,
            psi_enabled: psiEnabled } = row;

        return (
            <Table key={ `tb-${index}-recommendations-info` }
                aria-label="Nested column headers with expandable rows table"
                variant="compact" className="ros-recommendations-table" >
                <Thead >
                    <Tr>
                        <Th screenReaderText="Row expansion"/>
                        <Th>
                      Name
                        </Th>
                    </Tr>
                </Thead>
                <Tbody key={ `${index}-recommendations-info` } isExpanded={this.state.expanded}>
                    <Tr>
                        <Td expand={{
                            rowIndex: index,
                            isExpanded: this.state.expanded,
                            onToggle: this.onExpandToggle,
                            expandId: 'expandable-recommendation'
                        }} />
                        <Td dataLabel={'description'}>{description}</Td>
                    </Tr>
                    <Tr isExpanded={this.state.expanded}>
                        <Td></Td>
                        <Td colSpan={6}>
                            <ExpandableRowContent>
                                <Content>
                                    <Content>
                                        <Content component={ContentVariants.p} className="margin-text-bottom">
                                            <BullseyeIcon/><strong className="strong-tag-style">Detected issues</strong>
                                        </Content>
                                        {reason}
                                    </Content>
                                    { detectedIssues && <Table
                                        arial-label="Detected issues table"
                                        variant="compact"
                                        borders={false}
                                        className="table-border-top detected-issues-table"
                                    >
                                        <Thead>
                                            <Tr>
                                                <Th>Identified issues by ROS</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            <Tr>
                                                <Td dataLabel="Identified issues by ROS" className="newline tab">
                                                    {detectedIssues}</Td>
                                            </Tr>
                                        </Tbody>
                                    </Table> }
                                    <hr/>
                                    <Content>
                                        <Content component={ContentVariants.p} className="margin-text-bottom">
                                            <WrenchIcon/><strong className="strong-tag-style">Suggestion</strong>
                                        </Content>
                                        {resolution}
                                    </Content>
                                    { currentInstance && suggestedInstances && <Table
                                        arial-label="Suggestions table"
                                        variant="compact"
                                        borders={false}
                                        className="table-border-top suggestions-table"
                                    >
                                        <Thead>
                                            <Tr>
                                                <Th>Instance</Th>
                                                <Th>Suggested instances that fit the load better</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            <Tr>
                                                <Td dataLabel="Instance">{currentInstance}</Td>
                                                <Td dataLabel="Suggested instances that fit the load better" className="newline">
                                                    {suggestedInstances}</Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                    }
                                    {
                                        !psiEnabled &&
                                        <>
                                            <hr/>
                                            <Content>
                                                <Content component={ContentVariants.p} className="margin-text-bottom"><LightbulbIcon/>
                                                    <strong className="strong-tag-style">Related Knowledgebase Article</strong>
                                                </Content>
                                                {/* eslint-disable-next-line max-len */}
                                                <Content component={ContentVariants.a} target='_blank' href={ENABLE_PSI_URL}>
                                                    This suggestion could be improved by enabling PSI <ExternalLinkAltIcon/>
                                                </Content>
                                            </Content>
                                        </>
                                    }
                                </Content>
                            </ExpandableRowContent>
                        </Td>

                    </Tr>
                </Tbody>
            </Table>
        );
    };

    createRows() {
        const rowsData = this.props.recommendations;
        if (rowsData && rowsData.length !== 0) {
            return flatMap(rowsData, (row, index) => {
                return this.renderExpandedView(row, index);
            });
        } else {
            return <EmptyTable className='recs-table-empty'>
                <EmptyStateDisplay title="No suggestions"
                    text={[
                        'There are no suggestions for this system.'
                    ]}
                    icon={CheckCircleIcon}
                    color='green'/>
            </EmptyTable>;
        }
    }

    render() {
        return (
            <Fragment>
                {this.createRows()}
            </Fragment>

        );

    }
}

RecommendationsTable.propTypes = {
    recommendations: propTypes.array
};

export default RecommendationsTable;
