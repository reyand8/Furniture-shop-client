import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { loginUser, registerUser } from '../../../services/api/auth/authUser.api';
import { IRegister, IAuthResponse, ILogin } from '../../../types/authUser.interface';
import {
    registerRequest, registerSuccess, registerFailure,
    loginSuccess, loginFailure, loginRequest,
} from './authUser.slice';
import { getErrorMessage } from '../../../common/utils/errorHandler/getErrorMessage';
import { SERVER_RESPONSE_ERROR_MESSAGES } from '../../../common/utils/messages/messages';

const { FAILED } = SERVER_RESPONSE_ERROR_MESSAGES;


function* handleRegister(action: PayloadAction<IRegister>) {
    try {
        const response: IAuthResponse = yield call(registerUser, action.payload);
        localStorage.setItem('accessToken', response.access_token);
        yield put(registerSuccess(response));
    } catch (error: any) {
        yield put(registerFailure(getErrorMessage(error, FAILED)));
    }
}

function* handleLogin(action: PayloadAction<ILogin>) {
    try {
        const response: IAuthResponse = yield call(loginUser, action.payload);
        localStorage.setItem('accessToken', response.access_token);
        yield put(loginSuccess(response));
    } catch (error: any) {
        yield put(loginFailure(getErrorMessage(error, FAILED)));
    }
}

export function* authUserSaga() {
    yield takeLatest(registerRequest.type, handleRegister);
    yield takeLatest(loginRequest.type, handleLogin);
}
