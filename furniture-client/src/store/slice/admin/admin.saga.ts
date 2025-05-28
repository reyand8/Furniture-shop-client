import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { getErrorMessage } from '../../../common/utils/error-handler/getErrorMessage';
import { SERVER_RESPONSE_ERROR_MESSAGES } from '../../../common/utils/messages/messages';
import {
    fetchUsersFailure,
    fetchUsersRequest,
    fetchUsersSuccess,
    registerUserByAdminFailure,
    registerUserByAdminRequest,
    registerUserByAdminSuccess,
    updateUserByAdminFailure,
    updateUserByAdminRequest,
    updateUserByAdminSuccess
} from './admin.slice';
import { getUsersByRoleApi, updateUserByAdminApi } from '../../../services/api/admin/admin.api';
import { EUserRole, IUpdateUserByAdmin } from '../../../types/admin.interface';
import { IUser } from '../../../types/user.interface';
import { IAuthResponse, IRegister } from '../../../types/authUser.interface';
import { registerUser } from '../../../services/api/auth/authUser.api';


const { FAILED } = SERVER_RESPONSE_ERROR_MESSAGES;


function* fetchUsersByRole(action: PayloadAction<{ role: EUserRole }>) {
    try {
        const response: IUser[] = yield call(getUsersByRoleApi, action.payload.role);
        yield put(fetchUsersSuccess(response));
    } catch (error: any) {
        yield put(fetchUsersFailure(getErrorMessage(error, FAILED)));
    }
}

function* updateUserByAdmin(action: PayloadAction<{ userId: string; data: IUpdateUserByAdmin }>) {
    try {
        const { userId, data } = action.payload;
        const response: IUser = yield call(updateUserByAdminApi, userId, data);
        yield put(updateUserByAdminSuccess(response));
    } catch (error: any) {
        yield put(updateUserByAdminFailure(getErrorMessage(error, FAILED)));
    }
}

function* registerUserByAdmin(action: PayloadAction<IRegister>) {
    try {
        const response: IAuthResponse = yield call(registerUser, action.payload);
        yield put(registerUserByAdminSuccess(response));
    } catch (error: any) {
        yield put(registerUserByAdminFailure(getErrorMessage(error, FAILED)));
    }
}

export function* adminSaga() {
    yield takeLatest(fetchUsersRequest.type, fetchUsersByRole);
    yield takeLatest(registerUserByAdminRequest.type, registerUserByAdmin);
    yield takeLatest(updateUserByAdminRequest.type, updateUserByAdmin);
}