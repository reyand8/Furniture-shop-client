import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DoneIcon from '@mui/icons-material/Done';

import {
    ContactInfoItemAddress,
    ContactInfoItemBtns,
    ContactInfoItemCity,
    ContactInfoItemMainSelect,
    ContactInfoItemSelectInfo,
    SelectContactMainBox,
    SelectContactSection,
} from '../../../styles/ContactInfo.styles';
import { AppDispatch } from '../../../store/store';
import {
    fetchContactInfoRequest,
    selectContactInfo
} from '../../../store/slice/contactInfo/contactInfo.slice';
import Loading from '../../status/loading';
import Empty from '../../status/empty';
import { SelectOrderTitle} from '../../../styles/Order.styles';
import { setNewOrderContactId } from '../../../store/slice/order/order.slice';
import { IAllContactInfo } from '../../../types/contactInfo.interface';
import ErrorInfo from '../../status/error';
import ContactInfoAdd from "../../contact-info/contact-info-add";


/**
 * Component for selecting a contact information entry for an order.
 *
 * - Fetches contact info list from the server on mount.
 * - Displays contacts with address, phone, city, and zip code.
 * - Allows selecting one contact; shows a check icon when selected.
 * - Dispatches selected contact ID to the Redux store.
 * - Shows loading, empty, and error states accordingly.
 * - Includes embedded component for adding new contact info.
 */
const OrderSelectContact: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [selectedContactId, setSelectedContactId] = useState<string | null>(null);

    /**
     * Fetch contact information list when component mounts.
     */
    useEffect((): void => {
        dispatch(fetchContactInfoRequest({ page: 1, pageSize: 40 }));
    }, [dispatch]);

    const { contactInfo, loading, error } = useSelector(selectContactInfo);

    const isLoading: boolean = loading;
    const isLoaded: boolean = !error && !loading;

    /**
     * Handles user selection of a contact.
     * Updates local selected ID and Redux store.
     */
    const handleSelect = (id: string): void => {
        setSelectedContactId(id);
        dispatch(setNewOrderContactId(id))
    };

    return (
        <SelectContactMainBox sx={{m: 0, p:0}}>
            <SelectOrderTitle isSelected={!!selectedContactId}>
                Select Contact Info
                {selectedContactId && <DoneIcon color="success" />}
            </SelectOrderTitle>
            <ContactInfoAdd />
            <SelectContactSection>
                {isLoaded && contactInfo?.length > 0 && contactInfo.map(
                    ({id, address, phone, city, zipCode}: IAllContactInfo) => (
                        <ContactInfoItemMainSelect
                            key={id} onClick={(): void => handleSelect(id)}
                            isSelected={id === selectedContactId}>
                            <ContactInfoItemSelectInfo>
                                <ContactInfoItemAddress>{address}</ContactInfoItemAddress>
                                <ContactInfoItemAddress>{phone}</ContactInfoItemAddress>
                                <ContactInfoItemCity>{city}, {zipCode}</ContactInfoItemCity>
                            </ContactInfoItemSelectInfo>
                            <ContactInfoItemBtns />
                        </ContactInfoItemMainSelect>
                    ))}
                {isLoading && (
                    <Loading />
                )}
                {!isLoading && contactInfo?.length === 0 && (
                    <Empty />
                )}
                {error && <ErrorInfo />}
            </SelectContactSection>
        </SelectContactMainBox>
    );
};

export default OrderSelectContact;