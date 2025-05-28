import authUserReducer, {
    registerRequest,
    registerSuccess,
    registerFailure,
    loginRequest,
    loginSuccess,
    loginFailure,
    logout,
} from '../../../store/slice/authUser/authUser.slice';
import { IAuthState, IAuthResponse } from '../../../types/authUser.interface';


const ACCESS_TOKEN_KEY = 'accessToken';


beforeEach(() => {
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn(() => null);
    Storage.prototype.removeItem = jest.fn();
});

const initialState: IAuthState = {
    accessToken: null,
    loading: false,
    error: null,
};

describe('authUserSlice reducer', () => {
    it('should handle registerRequest', () => {
        const state = authUserReducer(initialState, registerRequest({
            email: 'test@example.com',
            firstName: 'Test',
            lastName: 'User',
            password: 'password123',
        }));
        expect(state.loading).toBe(true);
        expect(state.error).toBeNull();
    });

    it('should handle registerSuccess', () => {
        const mockResponse: IAuthResponse = {
            access_token: 'mock_token',
            refresh_token: 'mock_refresh',
        };

        const state = authUserReducer(initialState, registerSuccess(mockResponse));
        expect(state.loading).toBe(false);
        expect(state.accessToken).toBe('mock_token');
        expect(localStorage.setItem).toHaveBeenCalledWith(ACCESS_TOKEN_KEY, 'mock_token');
    });

    it('should handle registerFailure', () => {
        const state = authUserReducer(initialState, registerFailure('Registration failed'));
        expect(state.loading).toBe(false);
        expect(state.error).toBe('Registration failed');
    });

    it('should handle loginRequest', () => {
        const state = authUserReducer(initialState, loginRequest({
            email: 'test@example.com',
            password: 'password123',
        }));
        expect(state.loading).toBe(true);
        expect(state.error).toBeNull();
    });

    it('should handle loginSuccess', () => {
        const mockResponse: IAuthResponse = {
            access_token: 'login_token',
            refresh_token: 'refresh_token',
        };

        const state = authUserReducer(initialState, loginSuccess(mockResponse));
        expect(state.loading).toBe(false);
        expect(state.accessToken).toBe('login_token');
        expect(localStorage.setItem).toHaveBeenCalledWith(ACCESS_TOKEN_KEY, 'login_token');
    });

    it('should handle loginFailure', () => {
        const state = authUserReducer(initialState, loginFailure('Login failed'));
        expect(state.loading).toBe(false);
        expect(state.error).toBe('Login failed');
    });

    it('should handle logout', () => {
        const loggedInState: IAuthState = {
            ...initialState,
            accessToken: 'some_token',
        };

        const state = authUserReducer(loggedInState, logout());
        expect(state.accessToken).toBeNull();
        expect(localStorage.removeItem).toHaveBeenCalledWith(ACCESS_TOKEN_KEY);
    });
});
