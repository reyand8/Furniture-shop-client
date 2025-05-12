import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
    IAuthResponse,
    IAuthState,
    IRegister,
} from '../../../types/authUser.interface';
import { RootState } from '../../store';


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
            state.error = action.payload || 'Unknown error';
        },
        logout(state): void {
            state.accessToken = null;
            localStorage.removeItem('accessToken');
        },
    },
});

export const { registerRequest, registerSuccess, registerFailure, logout } = authUserSlice.actions;

export const selectUser = (state: RootState) => state.user;
export default authUserSlice.reducer;
