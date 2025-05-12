import {
    Box, Paper, styled,
    TextField, Typography
} from '@mui/material';

import auth_bg from '../assets/img/auth_bg.jpg';


export const AuthBox = styled(Box)(({ theme }) => ({
    backgroundImage: `url(${auth_bg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('lg')]: {
        height: 'auto',
        textAlign: 'center'
    },
}));

export const TextFieldBox = styled('form')(({ theme }) => ({
    [theme.breakpoints.up('xs')]: {
        margin: '0 auto',
        maxWidth: '220px',
    },
    [theme.breakpoints.up('md')]: {
        maxWidth: '320px',
    },
    [theme.breakpoints.up('lg')]: {
        maxWidth: '320px',
    },
}));

export const AuthPaper = styled(Paper)(() => ({
    padding: 20,
    minHeight: '42vh',
    maxWidth: 360,
    margin: '0 auto'
}));

export const AuthTitle = styled(Typography)(({ theme }) => ({
    fontSize: '23px',
    fontWeight: 700,
    color: theme.palette.text.secondary,
    textAlign: 'center',
    padding: '8px 0 21px 0'
}));

export const AuthTextField = styled(TextField)(({ theme }) => ({
    marginBottom: '16px',
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
    },
    '& .MuiInputBase-input': {
        color: theme.palette.text.secondary,
    },
}))
