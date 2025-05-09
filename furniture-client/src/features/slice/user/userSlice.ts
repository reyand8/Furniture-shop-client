import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { registerUser } from '../../api/userApi';
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

export const register =
    createAsyncThunk<IAuthResponse, IRegister, { rejectValue: string }>(
    'auth/register',
    async (data: IRegister, { rejectWithValue }) => {
        try {
            const res: IAuthResponse = await registerUser(data);
            localStorage.setItem('accessToken', res.access_token);
            return res;
        } catch (err: any) {
            return rejectWithValue(err.response?.data || { message: 'Register failed' });
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.accessToken = null;
            localStorage.removeItem('accessToken');
        },
    },
    extraReducers: (builder): void => {
        builder

            .addCase(register.pending, (state): void => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action): void => {
                state.loading = false;
                state.user = action.payload.user;
                state.accessToken = action.payload.access_token;
            })
            .addCase(register.rejected, (state, action): void => {
                state.loading = false;
                state.error = action.payload || 'Unknown error';
            })

    },
});

export const { logout } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
