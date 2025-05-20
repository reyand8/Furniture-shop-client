import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import {
    IAllContactInfo, IContactInfo,
    IContactInfoResponse,
    IContactInfoState, IUpdateContactInfo,
} from '../../../types/contactInfo.interface';
import {
    SERVER_RESPONSE_ERROR_MESSAGES
} from '../../../common/utils/messages/messages';
import { PAGE_SIZE } from '../../../common/commonItems';


const { UNKNOWN_ERROR } = SERVER_RESPONSE_ERROR_MESSAGES;

const initialState: IContactInfoState = {
    contactInfo: [],
    totalPages: 1,
    currentPage: 1,
    loading: false,
    error: null,
    success: false,
    deleteSuccess: false,
    updateSuccess: false,
    updateError: null
}

const contactInfoSlice = createSlice({
    name: 'contactInfo',
    initialState,
    reducers: {
        fetchContactInfoRequest(state,
                                action: PayloadAction<{ page: number, pageSize: number }>) {
            state.loading = true;
            state.error = null;
            state.currentPage = action.payload.page;
        },
        fetchContactInfoSuccess(state,
                                action: PayloadAction<IContactInfoResponse>) {
            state.loading = false;
            state.contactInfo = action.payload.contactInfo;
            state.totalPages = action.payload.totalPages;
        },
        fetchContactInfoFailure(state,
                                action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        createContactInfoRequest(state, _action: PayloadAction<IContactInfo>): void {
            state.loading = true;
            state.error = null;
        },
        createContactInfoSuccess(state,
                                 action: PayloadAction<IAllContactInfo>): void {
            state.loading = false;
            state.success = true;
            state.contactInfo.push(action.payload);
            state.totalPages = Math.ceil(state.contactInfo.length / PAGE_SIZE);
            state.currentPage = state.totalPages;
        },
        createContactInfoFailure(state,
                                 action: PayloadAction<string>): void {
            state.loading = false;
            state.error = action.payload || UNKNOWN_ERROR;
        },

        updateContactInfoRequest(state,
                                 _action: PayloadAction<{ data: IUpdateContactInfo, id: string }>): void {
            state.loading = true;
            state.updateError = null;
            state.updateSuccess = false;
        },
        updateContactInfoSuccess(state,
                                 action: PayloadAction<IAllContactInfo>): void {
            state.loading = false;
            const index: number = state.contactInfo.findIndex(
                info => info.id === action.payload.id
            );
            state.contactInfo[index] = action.payload;
            state.totalPages = Math.ceil(state.contactInfo.length / PAGE_SIZE);
            state.updateSuccess = true;
        },
        updateContactInfoFailure(state,
                                 action: PayloadAction<string>): void {
            state.loading = false;
            state.updateError = action.payload || UNKNOWN_ERROR;
            state.updateSuccess = false;
        },

        deleteContactInfoRequest(state,
                                 _action: PayloadAction<string>): void {
            state.loading = true;
            state.error = null;
        },
        deleteContactInfoSuccess(state,
                                 action: PayloadAction<string>): void {
            state.loading = false;
            state.deleteSuccess = true;
            state.contactInfo = state.contactInfo.filter(
                (item): boolean => item.id !== action.payload);
            state.currentPage = 1;
        },
        deleteContactInfoFailure(state,
                                 action: PayloadAction<string>): void {
            state.loading = false;
            state.error = action.payload || UNKNOWN_ERROR;
        },

        clearSuccess(state): void {
            state.success = false;
        },

        clearUpdateError(state): void {
            state.updateError = null;
        },
    },
});

export const {
    fetchContactInfoRequest, fetchContactInfoSuccess, fetchContactInfoFailure,
    createContactInfoRequest, createContactInfoSuccess, createContactInfoFailure,
    deleteContactInfoRequest, deleteContactInfoSuccess, deleteContactInfoFailure,
    updateContactInfoRequest, updateContactInfoSuccess, updateContactInfoFailure,
    clearSuccess, clearUpdateError
} = contactInfoSlice.actions;

export const selectContactInfo =
    (state: RootState): IContactInfoState => state.contactInfo;
export default contactInfoSlice.reducer;
