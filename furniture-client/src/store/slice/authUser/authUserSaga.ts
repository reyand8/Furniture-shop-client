import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { loginUser, registerUser } from '../../../services/api/authUserApi';
import { IRegister, IAuthResponse, ILogin } from '../../../types/authUser.interface';
import {
    registerRequest, registerSuccess, registerFailure,
    loginSuccess, loginFailure, loginRequest,
} from './authUserSlice';


function* handleRegister(action: PayloadAction<IRegister>) {
    try {
        const response: IAuthResponse = yield call(registerUser, action.payload);
        localStorage.setItem('accessToken', response.access_token);
        yield put(registerSuccess(response));
    } catch (error: any) {
        yield put(registerFailure(error?.response?.data?.message || 'Register failed'));
    }
}

function* handleLogin(action: PayloadAction<ILogin>) {
    try {
        const response: IAuthResponse = yield call(loginUser, action.payload);
        localStorage.setItem('accessToken', response.access_token);
        yield put(loginSuccess(response));
    } catch (error: any) {
        yield put(loginFailure(error?.response?.data?.message || 'Login failed'));
    }
}

export function* authUserSaga() {
    yield takeLatest(registerRequest.type, handleRegister);
    yield takeLatest(loginRequest.type, handleLogin);
}
