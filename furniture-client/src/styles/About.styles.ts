import { Box, styled, Typography } from '@mui/material';


export const AboutItemBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'reverse',
})<{ reverse?: boolean }>(({ theme, reverse }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '42px',
    margin: '84px 0',
    ...(reverse && {
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column-reverse',
        },
    }),
}));

export const AboutWelcomeBox = styled(Box)(() => ({
    maxWidth: '480px',
    width: '100%',
    padding: '16px',
}));

export const ImageStyled = styled('img')(({ theme }) => ({
    maxWidth: '377px',
    width: '100%',
    borderRadius: '42px',
}));

export const AdvantageContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.card,
    maxWidth: '729px',
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: `${theme.spacing(15)} auto`,
}));

export const AdvantageItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    maxWidth: '210px',
    width: '100%',
    textAlign: 'center',
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
}));

export const SectionText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: '14px',
}));

export const AdvantageText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontSize: '14px',
}));