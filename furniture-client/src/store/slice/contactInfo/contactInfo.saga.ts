import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import {
    IAllContactInfo,
    IContactInfo,
    IContactInfoResponse,
    IUpdateContactInfo
} from '../../../types/contactInfo.interface';
import {
    getContactInfoApi,
    createContactInfoApi,
    updateContactInfoApi,
    deleteContactInfoApi
} from '../../../services/api/contact-info/contactInfo.api';
import {
    createContactInfoFailure, createContactInfoRequest, createContactInfoSuccess,
    deleteContactInfoFailure, deleteContactInfoRequest, deleteContactInfoSuccess,
    fetchContactInfoFailure, fetchContactInfoRequest, fetchContactInfoSuccess,
    updateContactInfoFailure, updateContactInfoRequest, updateContactInfoSuccess
} from './contactInfo.slice';
import { getErrorMessage } from '../../../common/utils/error-handler/getErrorMessage';
import { SERVER_RESPONSE_ERROR_MESSAGES } from '../../../common/utils/messages/messages';


const { FAILED } = SERVER_RESPONSE_ERROR_MESSAGES;

/**
 * Fetches paginated contact information from the API.
 * @param action - Contains pagination parameters: page number and page size.
 */
function* fetchContactInfo(action: PayloadAction<{ page: number, pageSize: number }>) {
    try {
        const { page, pageSize } = action.payload;
        const response: IContactInfoResponse = yield call(getContactInfoApi, page, pageSize);
        yield put(fetchContactInfoSuccess(response));
    } catch (error: any) {
        yield put(fetchContactInfoFailure(getErrorMessage(error, FAILED)));
    }
}

/**
 * Creates new contact information via the API.
 * @param action - Contains the contact info data to be created.
 */
function* createContactInfo(action: PayloadAction<IContactInfo>) {
    try {
        const response: IAllContactInfo = yield call(createContactInfoApi, action.payload);
        yield put(createContactInfoSuccess(response));
    } catch (error: any) {
        yield put(createContactInfoFailure(getErrorMessage(error, FAILED)));
    }
}

/**
 * Updates existing contact information by ID via the API.
 * @param action - Contains updated data and the contact info ID.
 */
function* updateContactInfoSaga(action: PayloadAction<{ data: IUpdateContactInfo, id: string }>) {
    try {
        const response: IAllContactInfo = yield call(updateContactInfoApi, action.payload.data, action.payload.id);
        yield put(updateContactInfoSuccess(response));
    } catch (error: any) {
        yield put(updateContactInfoFailure(getErrorMessage(error, FAILED)));
    }
}

/**
 * Deletes contact information by ID via the API.
 * @param action - Contains the ID of the contact info to delete.
 */
function* deleteContactInfo(action: PayloadAction<string>) {
    try {
        const response: string = yield call(deleteContactInfoApi, action.payload);
        yield put(deleteContactInfoSuccess(response));
    } catch (error: any) {
        yield put(deleteContactInfoFailure(getErrorMessage(error, FAILED)));
    }
}

/**
 * Root saga that watches for contact info related actions and triggers respective worker sagas.
 */
export function* contactInfoSaga() {
    yield takeLatest(fetchContactInfoRequest.type, fetchContactInfo);
    yield takeLatest(createContactInfoRequest.type, createContactInfo);
    yield takeLatest(updateContactInfoRequest.type, updateContactInfoSaga);
    yield takeLatest(deleteContactInfoRequest.type, deleteContactInfo);
}