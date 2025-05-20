import React from 'react';
import { Box, Typography } from '@mui/material';

import {ISubmitErrorProps} from '../../types/props.interface';


const SubmitError: React.FC<ISubmitErrorProps> = ({ submitError }) => {
    return (
        <Box mt={2}>
            <Typography color="error" variant="body2" gutterBottom>
                {Array.isArray(submitError) ? 'Validation Errors:' : 'Error:'}
            </Typography>
            {Array.isArray(submitError) ? (
                <Box component="ul" sx={{ pl: 3, m: 0 }}>
                    {submitError.map((err, idx) => (
                        <Box component="li" key={idx}>
                            <Typography color="error" variant="body2">
                                {err}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            ) : (
                <Typography color="error" variant="body2">
                    {submitError}
                </Typography>
            )}
        </Box>
    );
};

export default SubmitError;
