import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUpdateUser, IUser, IUserState } from '../../../types/user.interface';
import { RootState } from '../../store';
import { SERVER_RESPONSE_ERROR_MESSAGES } from '../../../common/utils/messages/messages';

const { UNKNOWN_ERROR } = SERVER_RESPONSE_ERROR_MESSAGES;

const initialState: IUserState = {
    user: null,
    loading: false,
    error: null,
    updateError: null,
    updateSuccess: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchProfileRequest(state): void {
            state.loading = true;
            state.error = null;
        },
        fetchProfileSuccess(state, action: PayloadAction<IUser>): void {
            state.loading = false;
            state.user = action.payload;
        },
        fetchProfileFailure(state, action: PayloadAction<string>): void {
            state.loading = false;
            state.error = action.payload || UNKNOWN_ERROR;
        },

        updateProfileRequest(state, _action: PayloadAction<IUpdateUser>): void {
            state.loading = true;
            state.updateError = null;
            state.updateSuccess = false;
        },
        updateProfileSuccess(state, action: PayloadAction<IUser>): void {
            state.loading = false;
            state.user = action.payload;
            state.updateSuccess = true;
        },
        updateProfileFailure(state, action: PayloadAction<string>): void {
            state.loading = false;
            state.updateError = action.payload || UNKNOWN_ERROR;
            state.updateSuccess = false;
        },

        deleteProfileRequest(state): void {
            state.loading = true;
            state.error = null;
        },
        deleteProfileSuccess(state): void {
            state.loading = false;
            state.user = null;
        },
        deleteProfileFailure(state, action: PayloadAction<string>): void {
            state.loading = false;
            state.error = action.payload || UNKNOWN_ERROR;
        },

        clearProfileError(state): void {
            state.error = null;
        },

        clearUpdateSuccess(state): void {
            state.updateSuccess = false;
        },

        finishSession(state): void {
            state.user = null;
        },

    },
});

export const {
    fetchProfileRequest, fetchProfileSuccess, fetchProfileFailure,
    updateProfileRequest, updateProfileSuccess, updateProfileFailure,
    deleteProfileRequest, deleteProfileSuccess, deleteProfileFailure,
    clearProfileError, clearUpdateSuccess, finishSession,
} = userSlice.actions;

export const selectUser = (state: RootState): IUserState => state.user;
export default userSlice.reducer;
