import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';

import {
    ContactInfoItemAddress,
    ContactInfoItemBtns,
    ContactInfoItemCity,
    ContactInfoItemInfo,
    ContactInfoItemMain
} from '../../../styles/ContactInfo.styles';
import ModalConfirmDelete from '../../modal-confirm-delete';
import ContactInfoEdit from '../contact-info-edit';
import { AppDispatch } from '../../../store/store';
import {
    deleteContactInfoRequest
} from '../../../store/slice/contactInfo/contactInfo.slice';
import { IContactInfoProps } from '../../../types/props.interface';


const ContactInfoItem: React.FC<IContactInfoProps> = ({ item }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [modalDeleteConfirm, setModalDeleteConfirm] = useState(false);

    const { id, address, city, zipCode } = item;

    const handleDeleteClick = (): void => {
        setIsDeleteModalOpen(true);
    };

    const handleEditClick = (): void => {
        setIsEditModalOpen(true);
    };

    useEffect((): void => {
        if (modalDeleteConfirm) {
            handleDeleteConfirm();
        }
    }, [modalDeleteConfirm]);

    const handleDeleteConfirm = (): void => {
        dispatch(deleteContactInfoRequest(id));
        setModalDeleteConfirm(false);
        setIsDeleteModalOpen(false);
    };

    return (
        <ContactInfoItemMain>
            <ContactInfoItemInfo>
                <Box>
                    <ContactInfoItemAddress>{address}</ContactInfoItemAddress>
                    <ContactInfoItemCity>{city}, {zipCode}</ContactInfoItemCity>
                </Box>
                <Box>
                    <Button endIcon={<ArrowForwardIcon />}>
                        Details
                    </Button>
                </Box>
            </ContactInfoItemInfo>
            <ContactInfoItemBtns>
                <Button
                    color="info"
                    startIcon={<ModeEditIcon />}
                    onClick={handleEditClick}>
                    Edit
                </Button>
                <Button
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={handleDeleteClick}>
                    Delete
                </Button>
            </ContactInfoItemBtns>
            {isDeleteModalOpen && (
                <ModalConfirmDelete
                    message="Are you sure you want to delete this item?"
                    setModalConfirm={setModalDeleteConfirm}
                    setModalOpen={setIsDeleteModalOpen}
                />
            )}
            {isEditModalOpen && (
                <ContactInfoEdit
                    item={item}
                    modalEditOpen={isEditModalOpen}
                    setModalEditOpen={setIsEditModalOpen}
                />
            )}
        </ContactInfoItemMain>
    )
}

export default ContactInfoItem;