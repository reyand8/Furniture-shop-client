export const handleAuthError = (
    error: any,
    setErrors: (errors: any) => void,
    setSubmitError: (message: string) => void
): void => {
    if (Array.isArray(error?.message)) {
        const fieldErrors: any = {};
        error.message.forEach((item: any) => {
            fieldErrors[item.field] = item.errors.join(' ');
        });
        setErrors(fieldErrors);
    } else if (typeof error?.message === 'string') {
        setSubmitError(error.message);
    } else {
        setSubmitError('Something went wrong');
    }
};