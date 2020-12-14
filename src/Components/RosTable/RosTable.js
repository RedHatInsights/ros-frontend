import React from 'react';
import { Table, TableHeader, TableBody, expandable } from '@patternfly/react-table';
import propTypes from 'prop-types';
import { flatMap } from 'lodash';
import { ExpandedRow } from './ExpandedRow';
import { ProgressScoreBar } from './ProgressScoreBar';
import { EmptyTable } from '@redhat-cloud-services/frontend-components';
import EmptyStateDisplay from '../EmptyStateDisplay/EmptyStateDisplay';
import './RosTable.scss';

const actionLink = (id, textValue, classAsPerType, linkPath) => (
    <a href={ linkPath } className={ `pf-link ${classAsPerType} link-${id}` }>{textValue}</a>
);

const renderSystemLink = (id, textValue) => {
    return actionLink(id, textValue, 'system-link', '#');
};

const renderRecommendations = (id, textValue) => {
    let applyClasses = 'recommendations';
    if (textValue === 0) {
        applyClasses += ' green-400';
    }

    return actionLink(id, textValue, applyClasses, '#');
};

class RosTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { title: 'System Name', cellFormatters: [expandable] },
                { title: 'CPU score' },
                { title: 'Memory score' },
                { title: 'I/O score' },
                { title: 'Recommendations' },
                { title: 'State' }
            ],
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
        const rowsData = this.props.systems;

        if (rowsData.length !== 0) {
            return flatMap(rowsData, (row, index) => {
                const { cpu_score: cpuScore, memory_score: memoryScore, io_score: IOScore } = row.performance_profile;
                const { provider, instance_type: instanceType,
                    idling_type: idlingType, io_wait: ioWait } = row.facts;
                const { id, recommendation_count: recommendationCount } = row;

                return [
                    {
                        id: index,
                        isOpen: false,
                        cells: [
                            { title: renderSystemLink(id, row.display_name) },
                            { title: <ProgressScoreBar measureLocation='outside' valueScore={cpuScore} /> },
                            { title: <ProgressScoreBar measureLocation='outside' valueScore={memoryScore} /> },
                            { title: <ProgressScoreBar measureLocation='outside' valueScore={IOScore} /> },
                            { title: renderRecommendations(id, recommendationCount) },
                            { title: row.state }

                        ]
                    },
                    {
                        cells: [
                            {
                                title: <ExpandedRow {
                                    ...{ id, provider, instanceType, idlingType, ioWait }
                                } />
                            }
                        ],
                        parent: index * 2
                    }
                ];
            });
        } else {
            let emptyRow = <EmptyTable>
                <EmptyStateDisplay title={ 'No matching records found' } />
            </EmptyTable>;

            return [
                {
                    heightAuto: true,
                    cells: [
                        {
                            props: { colSpan: 7 },
                            title: emptyRow
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
                rows={rows} cells={columns} className="ros-systems-table">
                <TableHeader />
                <TableBody />
            </Table>
        );
    }
}

RosTable.propTypes = {
    systems: propTypes.array
};

export default RosTable;
