import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { registerUser } from '../../api/userApi';
import { IRegister, IAuthResponse } from '../../types/user.interface';
import {
    registerRequest,
    registerSuccess,
    registerFailure,
} from './userSlice';


function* handleRegister(action: PayloadAction<IRegister>) {
    try {
        const response: IAuthResponse = yield call(registerUser, action.payload);
        localStorage.setItem('accessToken', response.access_token);
        yield put(registerSuccess(response));
    } catch (error: any) {
        yield put(registerFailure(error?.response?.data?.message || 'Register failed'));
    }
}

export function* userSaga() {
    yield takeLatest(registerRequest.type, handleRegister);
}
