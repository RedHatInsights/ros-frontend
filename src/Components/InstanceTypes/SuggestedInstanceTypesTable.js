import React, { useState } from 'react';
import {
    TableVariant,
    TableComposable,
    Thead, Tr, Th, Tbody, Td
} from '@patternfly/react-table';
import {
    Card,
    CardBody,
    Pagination,
    PaginationVariant
} from '@patternfly/react-core';
import { PrimaryToolbar } from '@redhat-cloud-services/frontend-components/PrimaryToolbar';
import { PAGE, PER_PAGE } from '../../constants';

const SUGG_INSTANCE_TYPES_TABLE_COLUMNS = [
    'Suggested instance type',
    'Provider',
    'Description',
    'Systems'
];
const SUGG_INSTANCE_TYPES_DATA = [
    { instanceType: 't3.micro', provider: 'AWS', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing.', count: 1 },
    { instanceType: 't3.small', provider: 'AWS', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing.', count: 1 },
    { instanceType: 't2.small', provider: 'AWS', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing.', count: 2 },
    { instanceType: 't2.micro', provider: 'AWS', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing.', count: 1 },
    { instanceType: 't2.large', provider: 'AWS', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing.', count: 4 },
    { instanceType: 'm2.2xlarge', provider: 'AWS', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing.', count: 1 },
    { instanceType: 'm3.2xsmall', provider: 'AWS', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing.', count: 6 },
    { instanceType: 'm3.2xlarge', provider: 'AWS', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing.', count: 1 }
];

export default function SuggestedInstanceTypesTable() {

    const [page, setPage] = useState(PAGE);
    const [perPage, setPerPage] = useState(PER_PAGE);

    const onSetPage = (event, page) => setPage(page);
    const onPerPageSelect = (event, perPage) => {
        setPerPage(perPage);
        setPage(PAGE);
    };

    return (
        <>
            <section className='pf-l-page__main-section pf-c-page__main-section'>
                <Card>
                    <CardBody>
                        <PrimaryToolbar
                            pagination={{
                                itemCount: 50,
                                page,
                                perPage,
                                onSetPage,
                                onPerPageSelect
                            }}
                        />
                        <TableComposable
                            aria-label='suggested instance types table'
                            variant={TableVariant.compact}

                        >
                            <Thead noWrap>
                                <Tr>
                                    {
                                        SUGG_INSTANCE_TYPES_TABLE_COLUMNS.map(column => {
                                            return <Th key={column}>{column}</Th>;
                                        })
                                    }
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    SUGG_INSTANCE_TYPES_DATA.map(instance => {
                                        return (
                                            <Tr key={instance.instanceType}>
                                                <Td dataLabel={SUGG_INSTANCE_TYPES_TABLE_COLUMNS[0]}>{instance.instanceType}</Td>
                                                <Td dataLabel={SUGG_INSTANCE_TYPES_TABLE_COLUMNS[1]}>{instance.provider}</Td>
                                                <Td dataLabel={SUGG_INSTANCE_TYPES_TABLE_COLUMNS[2]}>{instance.description}</Td>
                                                <Td dataLabel={SUGG_INSTANCE_TYPES_TABLE_COLUMNS[3]}>{instance.count}</Td>
                                            </Tr>
                                        );
                                    })
                                }
                            </Tbody>
                        </TableComposable>
                        <Pagination
                            itemCount={50}
                            page={page}
                            perPage={perPage}
                            onSetPage={onSetPage}
                            onPerPageSelect={onPerPageSelect}
                            variant={PaginationVariant.bottom}
                            widgetId="pagination-options-menu-bottom"
                        />
                    </CardBody>
                </Card>
            </section>
        </>
    );
}
