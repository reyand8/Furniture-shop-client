import { styled, Typography, Box } from '@mui/material';


export const MaterialsInfoBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(15, 5),
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        margin: '26px 40px',
    },
}))

export const MaterialsInfoDescriptionBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        margin: theme.spacing(3.25),
    },
}))

export const MaterialsInfoTitle = styled(Typography)(({ theme }) => ({
    width: '100%',
    maxWidth: '400px',
    color: theme.palette.text.secondary,
    fontSize: 40,
    fontWeight: 700,
}))


export const MaterialsInfoText = styled(Typography)(({ theme }) => ({
    width: '100%',
    maxWidth: '424px',
    color: theme.palette.text.secondary,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.8,
    padding: theme.spacing(3, 0),
}))


export const ChooseUsImagesBox = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '20px',
    alignItems: 'start',
    marginLeft: theme.spacing(6.125),
}))

export const MoreInfoBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
}))

export const ChooseUsLeftImg = styled(Box)(() => ({
    display: 'grid',
    gridTemplateRows: 'repeat(1, 1fr)',
}))

export const ChooseUsRightImg = styled(Box)(() => ({}))
