import {Box, Button, styled, Typography} from "@mui/material";


export const DialogDetailsSection = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '14px',
    paddingLeft: '16px',
    maxWidth: '424px',
    width: '100%',
}));

export const DialogInfo = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '300px',
    width: '100%',
}));

export const DialogInfoOrderAdmin = styled(Box)(({theme}) => ({
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '420px',
    width: '100%',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
}));

export const DialogInfoOrderText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '160px',
    width: '100%',
    [theme.breakpoints.down('md')]: {
        maxWidth: '130px',
    },
}));

export const DialogInfoTitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontWeight: 700,
}));

export const DialogInfoText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
}));

export const DialogDetailsBtn = styled(Button)(() => ({
    width: '100%',
    marginTop: '24px',
    height: '60px',
}));

export const DialogDetailsMain = styled(Box)(({ theme }) => ({
    padding: 2,
    maxWidth: '460px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

export const OrderDetailsSubtitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontWeight: 700,
    fontSize: '19px',
    padding: '24px 0'
}));

export const DialogFormBtns = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    margin: '14px 38px 0',
    gap: '14px'
}));