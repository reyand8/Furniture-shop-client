import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
    IAuthResponse,
    IAuthState,
    IRegister,
} from '../../types/user.interface';
import { RootState } from '../../store';


const initialState: IAuthState = {
    user: null,
    accessToken: localStorage.getItem('accessToken'),
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        registerRequest(state, _action: PayloadAction<IRegister>) {
            state.loading = true;
            state.error = null;
        },
        registerSuccess(state, action: PayloadAction<IAuthResponse>) {
            state.loading = false;
            state.user = action.payload.user;
            state.accessToken = action.payload.access_token;
        },
        registerFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload || 'Unknown error';
        },
        logout(state) {
            state.user = null;
            state.accessToken = null;
            localStorage.removeItem('accessToken');
        },
    },
});

export const { registerRequest, registerSuccess, registerFailure, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
