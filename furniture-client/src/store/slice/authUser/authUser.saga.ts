import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { loginUser, registerUser } from '../../../services/api/auth/authUser.api';
import { IRegister, IAuthResponse, ILogin } from '../../../types/authUser.interface';
import {
    registerRequest, registerSuccess, registerFailure,
    loginSuccess, loginFailure, loginRequest,
} from './authUser.slice';
import { getErrorMessage } from '../../../common/utils/error-handler/getErrorMessage';
import { SERVER_RESPONSE_ERROR_MESSAGES } from '../../../common/utils/messages/messages';

const { FAILED } = SERVER_RESPONSE_ERROR_MESSAGES;

/**
 * Saga to handle user registration.
 *
 * @param action - Redux action containing registration payload (email, password, etc.)
 */
function* handleRegister(action: PayloadAction<IRegister>) {
    try {
        const response: IAuthResponse = yield call(registerUser, action.payload);
        yield put(registerSuccess(response));
    } catch (error: any) {
        yield put(registerFailure(getErrorMessage(error, FAILED)));
    }
}

/**
 * Saga to handle user login.
 *
 * @param action - Redux action containing login credentials (email, password).
 */
function* handleLogin(action: PayloadAction<ILogin>) {
    try {
        const response: IAuthResponse = yield call(loginUser, action.payload);
        yield put(loginSuccess(response));
    } catch (error: any) {
        yield put(loginFailure(getErrorMessage(error, FAILED)));
    }
}

/**
 * Root saga for authentication-related flows.
 * Listens for login and registration requests and triggers the appropriate worker sagas.
 */
export function* authUserSaga() {
    yield takeLatest(registerRequest.type, handleRegister);
    yield takeLatest(loginRequest.type, handleLogin);
}
