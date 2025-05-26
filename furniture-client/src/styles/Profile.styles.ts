import {Box, Button, ButtonProps, Paper, styled, Typography} from '@mui/material';

import profile_bg from '../assets/img/profile_bg.webp';


export const ProfileBox = styled(Box)(({ theme }) => ({
    backgroundImage: `url(${profile_bg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('lg')]: {
        height: 'auto',
        textAlign: 'center'
    },
}));

export const ProfileData = styled(Paper)(() => ({
    maxWidth: '830px',
    width: '100%',
    padding: '40px 20px',
}));

export const ProfileMainDataBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: '32px',
    margin: theme.spacing(12.5, 5, 17.5, 5),
    [theme.breakpoints.down('md')]: {
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
}));

export const ProfileTitle = styled(Typography)(({ theme }) => ({
    fontSize: '26px',
    fontWeight: 700,
    color: theme.palette.text.secondary,
    textAlign: 'center',
    padding: '16px 0 21px 0'
}));

export const ProfileInfoLabel = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    fontWeight: 700,
    color: theme.palette.text.secondary,
}));

export const DeleteProfileBtn = styled(Button)(({ theme }) => ({
    border: '1px solid',
    borderRadius: '6px',
    borderColor: theme.palette.error.dark,
    width: '120px',
    alignSelf: 'flex-end',
}));

export const ProfileMenuSection = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    top: theme.spacing(2),
    height: '480px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    maxWidth: '290px',
    width: '100%',
}));

export const ProfileMenuNavItem = styled(Button)<ButtonProps & { to?: string; isActive?: boolean }>(
    ({ theme, isActive }) => ({
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-start',
        color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
        textTransform: 'none',
        fontSize: '17px',
        maxWidth: '270px',
        width: '100%',
        gap: '14px',
        fontWeight: 400,
        backgroundColor: 'transparent',
        '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            bottom: -1,
            width: isActive ? '240px' : '0%',
            height: '2px',
            backgroundColor: theme.palette.primary.main,
            transition: 'width 0.4s ease-in-out',
        },
        '&:hover::after': {
            width: '240px',
        },
        '&:hover': {
            backgroundColor: 'transparent',
            color: theme.palette.primary.main,
        },
    })
);

export const AdminMenuSection = styled(Box)(({ theme }) => ({
    marginTop: '50px',
    marginBottom: '20px',
}));