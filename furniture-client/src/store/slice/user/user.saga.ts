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
import { getErrorMessage } from '../../../common/utils/errorHandler/getErrorMessage';
import { SERVER_RESPONSE_ERROR_MESSAGES } from '../../../common/utils/messages/messages';
import { logout } from '../authUser/authUser.slice';


const { FAILED } = SERVER_RESPONSE_ERROR_MESSAGES;

function* fetchProfile() {
    try {
        const response: IUser = yield call(getProfile);
        yield put(fetchProfileSuccess(response));
    } catch (error: any) {
        localStorage.removeItem('accessToken');
        yield put(fetchProfileFailure(getErrorMessage(error, FAILED)));
    }
}

function* updateProfileSaga(action: { payload: IUpdateUser }) {
    try {
        const response: IUser = yield call(updateProfile, action.payload);
        yield put(updateProfileSuccess(response));
    } catch (error: any) {
        yield put(updateProfileFailure(getErrorMessage(error, FAILED)));
    }
}

function* deleteProfileSaga() {
    try {
        yield call(deleteProfile);
        yield put(deleteProfileSuccess());
        yield put(logout());
    } catch (error: any) {
        yield put(deleteProfileFailure(getErrorMessage(error, FAILED)));
    }
}

export function* userSaga() {
    yield takeLatest(fetchProfileRequest.type, fetchProfile);
    yield takeLatest(updateProfileRequest, updateProfileSaga);
    yield takeLatest(deleteProfileRequest.type, deleteProfileSaga);
}
