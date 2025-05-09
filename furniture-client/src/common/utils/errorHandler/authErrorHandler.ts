/**
 * Handles authentication-related errors from API responses.
 *
 * - If the error message is an array of field-specific errors,
 *   it extracts and flattens all error messages into a single array.
 * - If the error message is a string, it sets it directly.
 * - Otherwise, sets a default generic error message.
 *
 * @param error - The error object returned from an API call.
 * @param setSubmitError - A function to update the error state (e.g., to show in UI).
 */
export const handleAuthError = (
    error: any,
    setSubmitError: (message: string) => void
): void => {
    if (Array.isArray(error?.message)) {
        const allMessages = error.message.flatMap((item: any) => item.errors);
        setSubmitError(allMessages);
    } else if (typeof error?.message === 'string') {
        setSubmitError(error.message);
    } else {
        setSubmitError('Something went wrong');
    }
};