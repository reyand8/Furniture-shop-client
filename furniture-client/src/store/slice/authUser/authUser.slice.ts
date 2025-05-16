import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
    IAuthResponse,
    IAuthState, ILogin,
    IRegister,
} from '../../../types/authUser.interface';
import { RootState } from '../../store';
import { SERVER_RESPONSE_ERROR_MESSAGES } from '../../../common/utils/messages/messages';

const { UNKNOWN_ERROR } = SERVER_RESPONSE_ERROR_MESSAGES;

const initialState: IAuthState = {
    accessToken: localStorage.getItem('accessToken'),
    loading: false,
    error: null,
};

const authUserSlice = createSlice({
    name: 'authUser',
    initialState,
    reducers: {
        registerRequest(state, _action: PayloadAction<IRegister>) {
            state.loading = true;
            state.error = null;
        },
        registerSuccess(state, action: PayloadAction<IAuthResponse>) {
            state.loading = false;
            state.accessToken = action.payload.access_token;
        },
        registerFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload || UNKNOWN_ERROR;
        },

        loginRequest(state, _action: PayloadAction<ILogin>): void {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action: PayloadAction<IAuthResponse>): void {
            state.loading = false;
            state.accessToken = action.payload.access_token;
        },
        loginFailure(state, action: PayloadAction<string>): void {
            state.loading = false;
            state.error = action.payload || UNKNOWN_ERROR;
        },
        logout(state): void {
            state.accessToken = null;
            localStorage.removeItem('accessToken');
        },
    },
});

export const {
    registerRequest, registerSuccess, registerFailure,
    loginRequest, loginSuccess, loginFailure, logout
} = authUserSlice.actions;

export const selectAuthUser = (state: RootState): IAuthState => state.authUser;
export default authUserSlice.reducer;
