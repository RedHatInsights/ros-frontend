import React, { useEffect, useState } from 'react';
import {
    TableVariant,
    Table /* data-codemods */,
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
    const [activeSortColumnKey, setActiveSortColumnKey] = useState('system_count');
    const [activeSortDirection, setActiveSortDirection] = useState(SortByDirection.desc);
    const [instanceTypeName, setInstanceTypeName] = useState('');
    const { loading, instances, count, serverError } = useSelector((state) => state.suggestedInstanceTypesReducer);

    const onSetPage = (event, page) => setPage(page);
    const onPerPageSelect = (event, perPage) => {
        setPerPage(perPage);
        setPage(PAGE);
    };

    useEffect(() =>{
        dispatch(loadSuggestedInstanceTypes({
            page, perPage, activeSortDirection, activeSortColumnKey, instanceTypeName
        }));
    }, [
        page,
        perPage,
        activeSortDirection,
        activeSortColumnKey,
        instanceTypeName
    ]);

    const getSortParams = (columnIndex, key) => ({
        sortBy: {
            index: activeSortIndex,
            direction: activeSortDirection
        },
        onSort: (event, index, direction) => {
            setActiveSortIndex(index);
            setActiveSortDirection(direction);
            setActiveSortColumnKey(key);
        },
        columnIndex
    });

    const activeFilters = () => {
        return instanceTypeName.length
            ? [{ category: 'Instance Types', chips: [{ name: instanceTypeName }] }]
            : [];
    };

    return (
        <>
            <section className='pf-v6-c-page__main-section'>
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
                            filterConfig={{
                                items: [{
                                    label: 'instance types',
                                    type: 'text',
                                    filterValues: {
                                        onChange: (e, value) => setInstanceTypeName(value),
                                        value: instanceTypeName
                                    }
                                }]
                            }}
                            activeFiltersConfig={{
                                deleteTitle: 'Reset filters',
                                filters: activeFilters(),
                                onDelete: () => setInstanceTypeName('')
                            }}
                        />
                        { serverError.message ? <ErrorState/> :
                            !loading ? <Table
                                aria-label='suggested instance types table'
                                variant={TableVariant.compact}
                            >
                                <Thead noWrap>
                                    <Tr>
                                        {
                                            SUGG_INSTANCE_TYPES_TABLE_COLUMNS.map((columnDetails, index) => {
                                                if (!columnDetails.isSortable) {
                                                    return <Th key={columnDetails.key}>{columnDetails.title}</Th>;
                                                }

                                                return <Th key={columnDetails.key} sort={getSortParams(index, columnDetails.key)}>
                                                    {columnDetails.title}</Th>;
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
                            </Table> : (
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
