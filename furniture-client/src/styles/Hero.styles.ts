import { Typography, Box, TextField, styled } from '@mui/material';

import hero_bg from '../assets/img/hero_bg.webp';


const commonTextShadow = '2px 2px 4px rgba(0, 0, 0, 0.4), -2px -2px 4px rgba(0, 0, 0, 0.4)';

export const HeroBox = styled(Box)(({ theme }) => ({
    backgroundImage: `url(${hero_bg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '1084px',
    [theme.breakpoints.down('lg')]: {
        height: 'auto',
        textAlign: 'center'
    },
}));

export const HeroItemsBox = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

export const HeroTitle = styled(Typography)(({ theme }) => ({
    fontSize: '64px',
    color: theme.palette.text.primary,
    width: '100%',
    maxWidth: '720px',
    fontWeight: 700,
    textShadow: commonTextShadow,
    marginTop: '32px',
    [theme.breakpoints.down('md')]: {
        maxWidth: '564px',
        fontSize: '47px',
        padding: '0 24px',
    },
    [theme.breakpoints.down('sm')]: {
        maxWidth: '404px',
        fontSize: '32px',
        padding: '0 24px',
    },
}))

export const HeroSubTitle = styled(Typography)(({ theme }) => ({
    fontSize: '17px',
    fontWeight: 300,
    textShadow: commonTextShadow,
    color: theme.palette.text.primary,
    width: '100%',
    maxWidth: '410px',
    textAlign: 'center',
    marginTop: '10px',
    [theme.breakpoints.down('md')]: {
        padding: '0 24px',
    },
}))

export const SearchBox = styled(Box)(() => ({
    maxWidth: '364px',
    width: '100%',
    margin: '34px 0 290px 0',
}))

export const SearchTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        backgroundColor: theme.palette.background.card,
        borderRadius: '24px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.contrastText,
        borderWidth: '0.8px',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.contrastText,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.contrastText,
    },
    '& .MuiInputBase-input': {
        color: theme.palette.primary.contrastText,
    },
}))

export const SearchBtnBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '30px',
    backgroundColor: theme.palette.primary.main,
}))

