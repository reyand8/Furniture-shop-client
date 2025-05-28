import reducer, {
    fetchUsersRequest,
    fetchUsersSuccess,
    fetchUsersFailure,
    registerUserByAdminRequest,
    registerUserByAdminSuccess,
    registerUserByAdminFailure,
    updateUserByAdminRequest,
    updateUserByAdminSuccess,
    updateUserByAdminFailure,
    clearRegisterByAdminSuccess,
    clearUpdateByAdminSuccess,
} from '../../../store/slice/admin/admin.slice';
import { EUserRole, IAdminState } from '../../../types/admin.interface';
import { IUser } from '../../../types/user.interface';

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

const mockUser: IUser = {
    id: 'u1',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@example.com',
    role: 'USER',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
};

describe('adminSlice', () => {
    it('should handle fetchUsersRequest', () => {
        const state = reducer(initialState, fetchUsersRequest({ role: EUserRole.USER }));
        expect(state.loading).toBe(true);
        expect(state.error).toBeNull();
    });

    it('should handle fetchUsersSuccess', () => {
        const state = reducer(initialState, fetchUsersSuccess([mockUser]));
        expect(state.loading).toBe(false);
        expect(state.users).toEqual([mockUser]);
    });

    it('should handle fetchUsersFailure', () => {
        const error = 'Failed to fetch';
        const state = reducer(initialState, fetchUsersFailure(error));
        expect(state.loading).toBe(false);
        expect(state.error).toBe(error);
    });

    it('should handle registerUserByAdminRequest', () => {
        const state = reducer(initialState, registerUserByAdminRequest({
            email: 'new@example.com',
            password: 'password123',
            firstName: 'New',
            lastName: 'User'
        }));
        expect(state.registerUserLoading).toBe(true);
        expect(state.error).toBeNull();
    });

    it('should handle registerUserByAdminSuccess', () => {
        const state = reducer(initialState, registerUserByAdminSuccess({ access_token: 'token', refresh_token: 'refresh' }));
        expect(state.registerUserLoading).toBe(false);
        expect(state.registerUserSuccess).toBe(true);
    });

    it('should handle registerUserByAdminFailure', () => {
        const error = 'Registration failed';
        const state = reducer(initialState, registerUserByAdminFailure(error));
        expect(state.registerUserLoading).toBe(false);
        expect(state.registerUserError).toBe(error);
    });

    it('should handle updateUserByAdminRequest', () => {
        const state = reducer(initialState, updateUserByAdminRequest({
            userId: 'u1',
            data: { role: 'ADMIN', isActive: false }
        }));
        expect(state.loadingUser).toBe(true);
        expect(state.updateUserError).toBeNull();
    });

    it('should handle updateUserByAdminSuccess', () => {
        const modifiedInitial = { ...initialState, users: [mockUser] };
        const updatedUser = { ...mockUser, role: 'ADMIN' };
        const state = reducer(modifiedInitial, updateUserByAdminSuccess(updatedUser));
        expect(state.loadingUser).toBe(false);
        expect(state.users[0].role).toBe('ADMIN');
        expect(state.updateUserSuccess).toBe(true);
    });

    it('should handle updateUserByAdminFailure', () => {
        const error = 'Update failed';
        const state = reducer(initialState, updateUserByAdminFailure(error));
        expect(state.loadingUser).toBe(false);
        expect(state.updateUserError).toBe(error);
    });

    it('should clear register success flag', () => {
        const modifiedState = { ...initialState, registerUserSuccess: true };
        const state = reducer(modifiedState, clearRegisterByAdminSuccess());
        expect(state.registerUserSuccess).toBe(false);
    });

    it('should clear update success flag', () => {
        const modifiedState = { ...initialState, updateUserSuccess: true };
        const state = reducer(modifiedState, clearUpdateByAdminSuccess());
        expect(state.updateUserSuccess).toBe(false);
    });
});
