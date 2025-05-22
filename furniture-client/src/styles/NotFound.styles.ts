import {Box, styled, Typography} from '@mui/material';

export const NotFoundBox = styled(Box)(({ theme }) => ({
    maxWidth: '830px',
    width: '100%',
    height: '480px',
    padding: '40px 20px',
    margin: '60px auto',
    borderRadius: '22px',
    backgroundColor: theme.palette.background.card,
}))


export const NotFoundItemBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
}))

export const NotFoundText = styled(Typography)(({ theme }) => ({
    fontSize: '29px',
    color: theme.palette.text.primary,
    fontWeight: 700,
    flexDirection: 'column',
}))
