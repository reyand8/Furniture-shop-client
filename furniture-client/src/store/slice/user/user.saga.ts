import { call, put, takeLatest } from 'redux-saga/effects';

import {
    fetchProfileRequest,
    fetchProfileSuccess,
    fetchProfileFailure,
    updateProfileSuccess,
    updateProfileFailure,
    updateProfileRequest,
    deleteProfileSuccess,
    deleteProfileFailure, deleteProfileRequest,
} from './user.slice';
import { IUpdateUser, IUser } from '../../../types/user.interface';
import { deleteProfile, getProfile, updateProfile } from '../../../services/api/user/user.api';
import { getErrorMessage } from '../../../common/utils/error-handler/getErrorMessage';
import { SERVER_RESPONSE_ERROR_MESSAGES } from '../../../common/utils/messages/messages';
import { logout } from '../authUser/authUser.slice';
import { ACCESS_TOKEN_KEY } from '../../../common/common-items';


const { FAILED } = SERVER_RESPONSE_ERROR_MESSAGES;

/**
 * Fetches the current user's profile from the API.
 * Removes access token on failure.
 */
function* fetchProfile() {
    try {
        const response: IUser = yield call(getProfile);
        yield put(fetchProfileSuccess(response));
    } catch (error: any) {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        yield put(fetchProfileFailure(getErrorMessage(error, FAILED)));
    }
}

/**
 * Updates the current user's profile with provided data.
 * @param action - Contains updated user data.
 */
function* updateProfileSaga(action: { payload: IUpdateUser }) {
    try {
        const response: IUser = yield call(updateProfile, action.payload);
        yield put(updateProfileSuccess(response));
    } catch (error: any) {
        yield put(updateProfileFailure(getErrorMessage(error, FAILED)));
    }
}

/**
 * Deletes the current user's profile.
 * On success, triggers logout action.
 */
function* deleteProfileSaga() {
    try {
        yield call(deleteProfile);
        yield put(deleteProfileSuccess());
        yield put(logout());
    } catch (error: any) {
        yield put(deleteProfileFailure(getErrorMessage(error, FAILED)));
    }
}

/**
 * Root saga watching user profile related actions.
 */
export function* userSaga() {
    yield takeLatest(fetchProfileRequest.type, fetchProfile);
    yield takeLatest(updateProfileRequest, updateProfileSaga);
    yield takeLatest(deleteProfileRequest.type, deleteProfileSaga);
}
