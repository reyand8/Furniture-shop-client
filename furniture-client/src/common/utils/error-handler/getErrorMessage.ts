/**
 * Extracts an error message from the error response object.
 * Returns a default message if no specific message is found.
 *
 * @param error - The error object returned from an API call.
 * @param defaultMessage - The fallback message to return if error message is unavailable.
 * @returns The extracted error message or the default message.
 */
export const getErrorMessage = (error: any, defaultMessage: string) => {
    return error?.response?.data?.message || defaultMessage;
};
