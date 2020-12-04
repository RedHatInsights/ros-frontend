import React from 'react';
import { Table, TableHeader, TableBody, expandable } from '@patternfly/react-table';
import propTypes from 'prop-types';
import { flatMap } from 'lodash';
import { ExpandedRow } from './ExpandedRow';
import { EmptyTable } from '@redhat-cloud-services/frontend-components';
import EmptyStateDisplay from '../EmptyStateDisplay/EmptyStateDisplay';
import { Progress } from '@patternfly/react-core';
import './RosTable.scss';

class RosTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { title: 'System ID', cellFormatters: [expandable] },
                { title: 'System Name' },
                { title: 'CPU Score' },
                { title: 'Memory Score' },
                { title: 'I/O Score' },
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

    colorSet(val) {
        switch (true) {
            case (val <= 40):
                return 'danger';
            case (val > 40 && val <= 80):
                return 'warning';
            default:
                return 'success';
        }
    }

    createRows() {
        const rowsData = this.props.systems;

        if (rowsData.length !== 0) {
            return flatMap(rowsData, (row, index) => {
                const { cpu_score: cpuScore, memory_score: memoryScore, io_score: IOScore } = row.performance_profile;
                const { id, provider, instance_type: instanceType,
                    idling_type: idlingType, io_wait: ioWait } = row.facts;
                return [
                    {
                        id: index,
                        isOpen: false,
                        cells: [
                            { title: row.id },
                            { title: row.display_name },
                            { title: <Progress className='progress-score-panel' value={cpuScore}
                                measureLocation={ 'outside' }
                                variant={ this.colorSet(cpuScore) } />
                            },
                            { title: <Progress className='progress-score-panel' value={memoryScore}
                                measureLocation={ 'outside' }
                                variant={ this.colorSet(memoryScore) } />
                            },
                            { title: <Progress className='progress-score-panel' value={IOScore}
                                measureLocation={ 'outside' }
                                variant={ this.colorSet(IOScore) } />
                            },
                            { title: row.recommendation_count },
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
