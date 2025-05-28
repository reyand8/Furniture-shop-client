import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import { SERVER_RESPONSE_ERROR_MESSAGES } from '../../../common/utils/messages/messages';
import { EUserRole, IAdminState, IUpdateUserByAdmin } from '../../../types/admin.interface';
import { IUser } from '../../../types/user.interface';
import { IAuthResponse, IRegister } from '../../../types/authUser.interface';

const { UNKNOWN_ERROR } = SERVER_RESPONSE_ERROR_MESSAGES;

const initialState: IAdminState = {
    users: [],

    loading: false,
    error: null,

    updateUserError: null,
    loadingUser: false,
    updateUserSuccess: false,

    registerUserSuccess: false,
    registerUserError: null,
    registerUserLoading: false,

};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {

        fetchUsersRequest(state, _action: PayloadAction<{role: EUserRole}>): void {
            state.loading = true;
            state.error = null;
        },
        fetchUsersSuccess(state, action: PayloadAction<IUser[]>): void {
            state.loading = false;
            state.users = action.payload;
        },
        fetchUsersFailure(state, action: PayloadAction<string>): void {
            state.loading = false;
            state.error = action.payload || UNKNOWN_ERROR;
        },


        registerUserByAdminRequest(state, _action: PayloadAction<IRegister>): void {
            state.registerUserLoading = true;
            state.error = null;
        },
        registerUserByAdminSuccess(state, action: PayloadAction<IAuthResponse>): void {
            state.registerUserLoading = false;
            state.registerUserSuccess = true;
        },
        registerUserByAdminFailure(state, action: PayloadAction<string>): void {
            state.registerUserLoading = false;
            state.registerUserError = action.payload || UNKNOWN_ERROR;
        },


        updateUserByAdminRequest(state,
                                 _action: PayloadAction<{ userId: string; data: IUpdateUserByAdmin }>): void {
            state.loadingUser = true;
            state.updateUserError = null;
        },
        updateUserByAdminSuccess(state, action: PayloadAction<IUser>): void {
            state.loadingUser = false;
            state.users = state.users.map(user =>
                user.id === action.payload.id ? action.payload : user
            );
            state.updateUserSuccess = true;
        },
        updateUserByAdminFailure(state, action: PayloadAction<string>): void {
            state.loadingUser = false;
            state.updateUserError = action.payload || UNKNOWN_ERROR;
        },


        clearUpdateByAdminSuccess(state): void {
            state.updateUserSuccess = false;
        },
        clearRegisterByAdminSuccess(state): void {
            state.registerUserSuccess = false;
        },
    },
});

export const {
    fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure,
    updateUserByAdminRequest, updateUserByAdminSuccess, updateUserByAdminFailure,
    registerUserByAdminRequest, registerUserByAdminSuccess, registerUserByAdminFailure,
    clearUpdateByAdminSuccess, clearRegisterByAdminSuccess
} = adminSlice.actions;

export const selectAdmin = (state: RootState): IAdminState => state.admin;

export default adminSlice.reducer;
