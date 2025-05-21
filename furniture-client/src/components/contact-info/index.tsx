import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { AppDispatch } from '../../store/store';
import {
    clearSuccess,
    fetchContactInfoRequest,
    selectContactInfo
} from '../../store/slice/contactInfo/contactInfo.slice';
import ContactInfoAdd from './contact-info-add';
import ContactInfoItem from './contact-info-item';
import { IAllContactInfo } from '../../types/contactInfo.interface';
import theme from '../../assets/theme';
import { ContactInfoAllItemsBox, EmptySectionBox, PaginationBox } from '../../styles/ContactInfo.styles';
import { PAGE_SIZE } from '../../common/common-items';


const ContactInfo: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { contactInfo, totalPages, currentPage, loading, error, deleteSuccess } =
        useSelector(selectContactInfo);

    useEffect((): void => {
        dispatch(fetchContactInfoRequest({ page: currentPage, pageSize: PAGE_SIZE }));
    }, [dispatch, currentPage]);

    useEffect((): void => {
        if (deleteSuccess) {
            dispatch(fetchContactInfoRequest({ page: currentPage, pageSize: PAGE_SIZE }));
            dispatch(clearSuccess());
        }
    }, [deleteSuccess, currentPage, dispatch]);

    const handleNextPage = (): void => {
        if (currentPage < totalPages) {
            dispatch(fetchContactInfoRequest({ page: currentPage + 1, pageSize: PAGE_SIZE }));
        }
    };

    const handlePrevPage = (): void => {
        if (currentPage > 1) {
            dispatch(fetchContactInfoRequest({ page: currentPage - 1, pageSize: PAGE_SIZE }));
        }
    };

    const isEmpty: boolean = !loading && !error && contactInfo.length === 0;
    const hasData: boolean = !loading && !error && contactInfo.length > 0;

    return (
        <Box>
            <ContactInfoAdd />
            {isEmpty && (
                <EmptySectionBox>
                    <FolderOpenIcon sx={{
                        color: theme.palette.text.defaultBtn,
                        fontSize: 92
                    }} />
                    <Typography sx={{ color: theme.palette.text.defaultBtn }}>
                        Contact Info Section Is Empty
                    </Typography>
                </EmptySectionBox>
            )}
            {hasData && (
                <>
                    <ContactInfoAllItemsBox>
                        {contactInfo.map((item: IAllContactInfo, index: number) => (
                            <ContactInfoItem item={item} key={item.id || index} />
                        ))}
                    </ContactInfoAllItemsBox>
                    <PaginationBox>
                        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
                            <ArrowBackIosIcon />
                        </Button>
                        <Typography color={theme.palette.text.secondary}>
                            Page {currentPage} of {totalPages}
                        </Typography>
                        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
                            <ArrowForwardIosIcon />
                        </Button>
                    </PaginationBox>
                </>
            )}
        </Box>
    )
}

export default ContactInfo;