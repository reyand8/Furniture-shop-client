import React from 'react';
import { CircularProgress } from '@mui/material';

import { StatusIcon } from '../../../styles/Status.styles';


const LoadingInfo = () => {
    return (
        <StatusIcon>
            <CircularProgress sx={{ my: 7}} size="5rem" />
        </StatusIcon>
    );
};

export default LoadingInfo;