import { Box, styled, Typography } from '@mui/material';

import contact_us from '../assets/img/contact_bg.jpg';


export const ContactUsBox = styled(Box)(({ theme }) => ({
    backgroundImage: `url(${contact_us})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 24px',
    [theme.breakpoints.down('lg')]: {
        height: 'auto',
        textAlign: 'center',
    },
}));

export const ContactInfoAll = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '60px'
}));

export const ContactInfoBox = styled(Box)(({ theme }) => ({
    maxWidth: '1000px',
    width: '100%',
    borderRadius: '18px',
    margin: '60px 0',
    backgroundColor: 'rgba(255,255,255,0.9)',
}));

export const ContactInfoTitle = styled(Typography)(({ theme }) => ({
    fontSize: '36px',
    color: theme.palette.text.secondary,
    fontWeight: 700,
    textAlign: 'center',
    padding: '14px 0',
}));

export const MapBox = styled(Box)(({ theme }) => ({
    height: '380px',
    maxWidth: '500px',
    width: '100%',
    padding: '0 14px',
}));

export const ContactInfoDetails = styled(Box)(({ theme }) => ({
    margin: '16px 16px 16px 28px',
}));

export const ContactInfoItem = styled(Box)(({ theme }) => ({
    color: theme.palette.text.secondary,
    marginBottom: '21px',
}));

export const ContactInfoItemTitle = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    fontWeight: 700,
    color: theme.palette.text.secondary,
    paddingBottom: '8px',
}));

export const ContactInfoDataBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    maxWidth: '280px',
    width: '100%',
}));

export const ContactInfoItemData = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
}));
