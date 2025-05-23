import React from 'react';
import { Typography } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

import { EmptySectionBox } from '../../../styles/ContactInfo.styles';
import theme from '../../../assets/theme';


const Empty = () => {
    return (
        <EmptySectionBox>
            <FolderOpenIcon sx={{
                color: theme.palette.text.defaultBtn,
                fontSize: 92
            }}/>
            <Typography sx={{ color: theme.palette.text.defaultBtn }}>
                This Section Is Empty
            </Typography>
        </EmptySectionBox>
    );
};

export default Empty;