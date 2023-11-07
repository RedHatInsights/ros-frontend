import React, { useEffect, useState } from 'react';
import {
    TableVariant,
    TableComposable,
    Thead, Tr, Th, Tbody, Td, SortByDirection
} from '@patternfly/react-table';
import {
    Card,
    Spinner,
    Bullseye,
    CardBody,
    Pagination,
    PaginationVariant
} from '@patternfly/react-core';
import { PrimaryToolbar } from '@redhat-cloud-services/frontend-components/PrimaryToolbar';
import ErrorState from '@redhat-cloud-services/frontend-components/ErrorState';
import { PAGE, PER_PAGE } from '../../constants';
import { useSelector, useDispatch } from 'react-redux';
import { loadSuggestedInstanceTypes } from '../../store/actions';
import { SUGG_INSTANCE_TYPES_TABLE_COLUMNS } from '../../constants';

export default function SuggestedInstanceTypesTable() {
    const dispatch = useDispatch();
    const [page, setPage] = useState(PAGE);
    const [perPage, setPerPage] = useState(PER_PAGE);
    const [activeSortIndex, setActiveSortIndex] = useState(3);
    const [activeSortDirection, setActiveSortDirection] = useState(SortByDirection.desc);
    const { loading, instances, count, serverError } = useSelector((state) => state.suggestedInstanceTypesReducer);

    const onSetPage = (event, page) => setPage(page);
    const onPerPageSelect = (event, perPage) => {
        setPerPage(perPage);
        setPage(PAGE);
    };

    useEffect(() =>{
        dispatch(loadSuggestedInstanceTypes({
            page, perPage, activeSortDirection, activeSortIndex
        }));
    }, [
        page,
        perPage,
        activeSortDirection,
        activeSortIndex
    ]);

    const getSortParams = (columnIndex) => ({
        sortBy: {
            index: activeSortIndex,
            direction: activeSortDirection
        },
        onSort: (event, index, direction) => {
            setActiveSortIndex(index);
            setActiveSortDirection(direction);
        },
        columnIndex
    });

    return (
        <>
            <section className='pf-l-page__main-section pf-c-page__main-section'>
                <Card>
                    <CardBody>
                        <PrimaryToolbar
                            pagination={{
                                itemCount: count,
                                page,
                                perPage,
                                onSetPage,
                                onPerPageSelect
                            }}
                        />
                        { serverError.message ? <ErrorState/> :
                            !loading ? <TableComposable
                                aria-label='suggested instance types table'
                                variant={TableVariant.compact}
                            >
                                <Thead noWrap>
                                    <Tr>
                                        {
                                            SUGG_INSTANCE_TYPES_TABLE_COLUMNS.map((column, index) => {
                                                if (index === 1 || index === 2) {
                                                    return <Th key={column}>{column}</Th>;
                                                }

                                                return <Th key={column} sort={getSortParams(index)}>
                                                    {column}</Th>;
                                            })
                                        }
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        instances.map(instance => {
                                            return (
                                                <Tr key={instance.instance_type}>
                                                    <Td>{instance.instance_type}</Td>
                                                    <Td>{instance.cloud_provider}</Td>
                                                    <Td>{instance.description}</Td>
                                                    <Td>{instance.system_count}</Td>
                                                </Tr>
                                            );
                                        })
                                    }
                                </Tbody>
                            </TableComposable> : (
                                <Bullseye>
                                    <Spinner/>
                                </Bullseye>
                            )}
                        <Pagination
                            itemCount={count}
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
