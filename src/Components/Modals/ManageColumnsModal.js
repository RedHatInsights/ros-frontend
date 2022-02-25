import React, { useState } from 'react';
import propTypes from 'prop-types';
import {
    Button,
    DataList,
    DataListCell,
    DataListCheck,
    DataListItem,
    DataListItemCells,
    DataListItemRow,
    Modal,
    Split,
    SplitItem,
    Text,
    TextContent,
    TextVariants
} from '@patternfly/react-core';

export const ManageColumnsModal = ({ activeColumns, isModalOpen, setModalOpen, saveColumns }) => {

    const [currentColumns, setCurrentColumns] = useState(activeColumns);

    const handleSave = () => {
        setModalOpen(false);
        saveColumns(currentColumns);
    };

    const handleCancel = () => {
        setModalOpen(false);
        setCurrentColumns(activeColumns);
    };

    const handleSelectAll = () => {
        setCurrentColumns(currentColumns.map(column => ({ ...column, isChecked: true })));
    };

    const handleResetToDefault = () => {
        setCurrentColumns(currentColumns.map(column => ({ ...column, isChecked: column.isShownByDefault ?? false })));
    };

    const onCheckChange = (index) => {
        const newColumns = [...currentColumns];
        const changedColumn = { ...newColumns[index] };

        changedColumn.isChecked = !changedColumn.isChecked;
        newColumns[index] = changedColumn;

        setCurrentColumns(newColumns);

    };

    return (
        <Modal
            title='Manage columns'
            onClose={handleCancel}
            isOpen={isModalOpen}
            variant='small'
            description={
                <TextContent>
                    <Text component={TextVariants.p}>Selected categories will be displayed in the table</Text>
                    <Split hasGutter>
                        <SplitItem>
                            <Button isInline onClick={handleSelectAll} variant="link">
                                Select all
                            </Button>
                        </SplitItem>
                        <SplitItem>
                            <Button isInline onClick={handleResetToDefault} variant="link">
                                Reset to default
                            </Button>
                        </SplitItem>

                    </Split>
                </TextContent>
            }
            actions={[
                <Button key="save" variant="primary" onClick={handleSave}>
                    Save
                </Button>,
                <Button key="cancel" variant="secondary" onClick={handleCancel}>
                    Cancel
                </Button>
            ]}
        >
            <DataList aria-label="Column management table" id="column-management-table" isCompact>
                {
                    currentColumns.map((column, index)=>
                        <DataListItem key={column.key}>
                            <DataListItemRow>
                                <DataListCheck
                                    checked={column.isChecked}
                                    id={`checkbox-${index}`}
                                    onChange={() => onCheckChange(index)}
                                    isDisabled={column.isDisabled}
                                />
                                <DataListItemCells
                                    dataListCells={[
                                        <DataListCell key={`column-table-item-${index}`}>
                                            <label>
                                                {column.title}
                                            </label>
                                        </DataListCell>
                                    ]}
                                />
                            </DataListItemRow>
                        </DataListItem>
                    )}
            </DataList>
        </Modal>
    );

};

ManageColumnsModal.propTypes = {
    activeColumns: propTypes.arrayOf(propTypes.object).isRequired,
    isModalOpen: propTypes.bool.isRequired,
    setModalOpen: propTypes.func.isRequired,
    saveColumns: propTypes.func.isRequired

};

