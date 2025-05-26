import { Avatar, Box, Button, Paper, styled, Typography } from '@mui/material';


export const BasketInfoBox = styled(Box)(() => ({
    maxWidth: '920px',
    width: '100%',
    padding: '24px',
    margin: '0 auto',
}));

export const BasketInfoMainTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    fontSize: '29px',
    color: theme.palette.text.secondary,
}));

export const BasketItemsSection = styled(Box)(({theme}) => ({
    maxHeight: '480px',
    overflowY: 'scroll',
    marginTop: '32px',
    padding: '12px',
    scrollbarWidth: 'auto',
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.background.group,
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: theme.palette.background.default,
    },
}));

export const BasketItemPaper = styled(Paper)(({ theme }) => ({
    padding: '14px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexDirection: 'row',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

export const BasketItemName = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontWeight: 700,
    fontSize: '19px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '240px',
    width: '100%',
}));

export const BasketItemQtyBox = styled(Box)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    marginLeft: '24px',
    [theme.breakpoints.down('md')]: {
        marginLeft: '0',
    },
}));

export const BasketQtyText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontWeight: 700,
    marginRight: '16px',
}));

export const BasketItemAvatar = styled(Avatar)(({ theme }) => ({
    width: '80px',
    height: '80px',
    mr: '16px',
}));

export const BasketItemPrice = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontWeight: 700,
    fontSize: '16px',
    marginRight: '30px',
    [theme.breakpoints.down('md')]: {
        marginRight: '0',
    },
}));

export const BasketTotalBox = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    margin: '60px 0',
}));

export const BasketTotal = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontWeight: 700,
    fontSize: '28px',
}));

export const BasketOrderBtn = styled(Button)(() => ({
    marginTop: '18px',
    maxWidth: '240px',
    width: '100%',
}));

export const StatusBox = styled(Box)(() => ({
    height: '100vh',
}));