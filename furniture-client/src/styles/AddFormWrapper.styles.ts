import {Box, Button, styled} from '@mui/material';

export const AddFormWrapperBox = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
}));

export const AddFormWrapperOpenBtn = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.background.group,
    maxWidth: '620px',
    width: '100%',
}));