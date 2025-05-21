import { styled, Box, Typography } from '@mui/material';


export const FooterBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: `${theme.spacing(4.5)} ${theme.spacing(3.25)}`,
    backgroundColor: theme.palette.background.headerFooterBg,
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
}));

export const FooterLogoBox = styled(Box)(() => ({
    maxWidth: '440px',
    width: '100%',
}));

export const FooterFollowBox = styled(Box)(({ theme }) => ({
    maxWidth: '140px',
    width: '100%',
    marginRight: theme.spacing(3.75),
    [theme.breakpoints.down('md')]: {
        marginTop: theme.spacing(3.75),
    },
}));

export const FooterFollowText = styled(Typography)(({ theme }) => ({
    fontSize: '18px',
    fontWeight: 700,
    color: theme.palette.text.primary,
}));

export const FooterAllIconsBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(1),
}));

export const FooterIconBox = styled('img')(() => ({
    width: '32px'
}));
