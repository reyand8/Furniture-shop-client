import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';

import { AppDispatch } from '../../store/store';
import {
    clearSuccess,
    fetchContactInfoRequest,
    selectContactInfo
} from '../../store/slice/contactInfo/contactInfo.slice';
import ContactInfoAdd from './contact-info-add';
import ContactInfoItem from './contact-info-item';
import { IAllContactInfo } from '../../types/contactInfo.interface';
import { ContactInfoAllItemsBox } from '../../styles/ContactInfo.styles';
import { PAGE_SIZE } from '../../common/common-items';
import Pagination from '../pagination';
import Empty from '../status/empty';


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
            { isEmpty && (
                <Empty />
            )}
            {hasData && (
                <>
                    <ContactInfoAllItemsBox>
                        {contactInfo.map((item: IAllContactInfo, index: number) => (
                            <ContactInfoItem item={item} key={item.id || index} />
                        ))}
                    </ContactInfoAllItemsBox>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPrev={handlePrevPage}
                        onNext={handleNextPage}
                    />
                </>
            )}
        </Box>
    )
}

export default ContactInfo;