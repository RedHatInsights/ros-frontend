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
    Split,
    SplitItem,
    Content,
    ContentVariants,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalVariant
} from '@patternfly/react-core';

export const ManageColumnsModal = ({ modalColumns, isModalOpen, setModalOpen, saveColumns }) => {

    const [currentColumns, setCurrentColumns] = useState(modalColumns);

    const handleSave = () => {
        setModalOpen(false);
        saveColumns(currentColumns);
    };

    const handleCancel = () => {
        setModalOpen(false);
        setCurrentColumns(modalColumns);
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
            variant={ModalVariant.small}
            aria-labelledby="select-columns-modal-title"
            aria-describedby="modal-box-select-columns-form"
        >
            <ModalHeader
                title="Manage columns"
                descriptorId="modal-box-select-columns-form"
                labelId="select-columns-modal-title"
                description={
                    <Content>
                        <Content component={ContentVariants.p}>Selected categories will be displayed in the table</Content>
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
                    </Content>
                } />
            <ModalBody>
                <DataList aria-label="Column management table" id="column-management-table" isCompact>
                    {
                        currentColumns.map((column, index)=>
                            <DataListItem key={column.key}>
                                <DataListItemRow>
                                    <DataListCheck
                                        isChecked={column.isChecked}
                                        id={`checkbox-${index}`}
                                        onChange={() => onCheckChange(index)}
                                        isDisabled={column.isDisabled}
                                        aria-labelledby={`checkbox-${index}`}
                                    />
                                    <DataListItemCells
                                        dataListCells={[
                                            <DataListCell key={`column-table-item-${index}`}>
                                                <label>
                                                    {column.modalTitle}
                                                </label>
                                            </DataListCell>
                                        ]}
                                    />
                                </DataListItemRow>
                            </DataListItem>
                        )}
                </DataList>
            </ModalBody>
            <ModalFooter>
                <Button key="save" variant="primary" onClick={handleSave}>
                    Save
                </Button>,
                <Button key="cancel" variant="secondary" onClick={handleCancel}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );

};

ManageColumnsModal.propTypes = {
    modalColumns: propTypes.arrayOf(propTypes.object).isRequired,
    isModalOpen: propTypes.bool.isRequired,
    setModalOpen: propTypes.func.isRequired,
    saveColumns: propTypes.func.isRequired
};

