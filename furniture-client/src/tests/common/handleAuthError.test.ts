import { SERVER_RESPONSE_ERROR_MESSAGES } from '../../common/utils/messages/messages';
import { handleAuthError } from '../../common/utils/error-handler/authErrorHandler';


const { FAILED } = SERVER_RESPONSE_ERROR_MESSAGES;

describe('handleAuthError', () => {
    let setSubmitError: jest.Mock;

    beforeEach(() => {
        setSubmitError = jest.fn();
    });

    it('should handle error as string', () => {
        const errorString = 'Invalid credentials';
        handleAuthError(errorString, setSubmitError);

        expect(setSubmitError).toHaveBeenCalledWith('Invalid credentials');
    });

    it('should handle unknown error format with default FAILED message', () => {
        const unknownError = { status: 500 };
        handleAuthError(unknownError as any, setSubmitError);

        expect(setSubmitError).toHaveBeenCalledWith(FAILED);
    });
});