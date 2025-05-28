import reducer, {
    fetchProfileRequest,
    fetchProfileSuccess,
    fetchProfileFailure,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFailure,
    deleteProfileSuccess,
    clearProfileError,
    finishSession,

} from '../../../store/slice/user/user.slice';
import { IUserState, IUser } from '../../../types/user.interface';


const initialState: IUserState = {
    user: null,
    loading: false,
    error: null,
    updateError: null,
    updateSuccess: false,
};

const mockUser: IUser = {
    id: '123',
    email: 'test@example.com',
    firstName: 'Test User',
    lastName: 'Test User',
    role: 'ADMIN',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
};

describe('userSlice', () => {
    it('should handle fetchProfileRequest', () => {
        const state = reducer(initialState, fetchProfileRequest());
        expect(state.loading).toBe(true);
        expect(state.error).toBeNull();
    });

    it('should handle fetchProfileSuccess', () => {
        const state = reducer(initialState, fetchProfileSuccess(mockUser));
        expect(state.user).toEqual(mockUser);
        expect(state.loading).toBe(false);
    });

    it('should handle fetchProfileFailure', () => {
        const state = reducer(initialState, fetchProfileFailure('error message'));
        expect(state.error).toBe('error message');
        expect(state.loading).toBe(false);
    });

    it('should handle updateProfileRequest', () => {
        const state = reducer(initialState, updateProfileRequest(
            {   firstName: 'New name',
                lastName: 'New',
                email: 'a@a.com',
            }));
        expect(state.loading).toBe(true);
        expect(state.updateError).toBeNull();
    });

    it('should handle updateProfileSuccess', () => {
        const state = reducer(initialState, updateProfileSuccess(mockUser));
        expect(state.user).toEqual(mockUser);
        expect(state.updateSuccess).toBe(true);
    });

    it('should handle updateProfileFailure', () => {
        const state = reducer(initialState, updateProfileFailure('fail'));
        expect(state.updateError).toBe('fail');
        expect(state.updateSuccess).toBe(false);
    });

    it('should handle deleteProfileSuccess', () => {
        const state = reducer({ ...initialState, user: mockUser }, deleteProfileSuccess());
        expect(state.user).toBeNull();
        expect(state.loading).toBe(false);
    });

    it('should handle clearProfileError', () => {
        const state = reducer({ ...initialState, error: 'oops' }, clearProfileError());
        expect(state.error).toBeNull();
    });

    it('should handle finishSession', () => {
        const state = reducer({ ...initialState, user: mockUser }, finishSession());
        expect(state.user).toBeNull();
    });
});
