import { Box, Button, styled, Typography } from '@mui/material';

import { IImageItemBoxProps } from '../types/props.interface';


export const SingleItemBox = styled(Box)(({theme}) => ({
    maxWidth: '990px',
    width: '100%',
    margin: '90px auto',
    padding: '0 40px',
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('md')]: {
        flexWrap: 'wrap',
    },
}))

export const SelectedImageBox = styled("img")(() => ({
    maxWidth: '510px',
    width: '100%',

    borderRadius: 8,
    border: '1px solid #ccc',
    marginBottom: 16,
    objectFit: 'contain',
}));

export const ImageItemBox = styled('img')<IImageItemBoxProps>(({ selected, theme }) => ({
    maxWidth: '140px',
    width: '100%',

    objectFit: 'cover',
    cursor: 'pointer',
    borderRadius: 1,
    transition: 'border 0.3s',
    border: selected
        ? `2px solid ${theme.palette.primary.main}`
        : `1px solid ${theme.palette.primary.light}`,
}));

export const AllImagesBox = styled(Box)(({theme}) => ({
    display: 'flex',
    gap: '12px',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
    },
}))

export const SingleItemInfoBox = styled(Box)(() => ({
    maxWidth: '400px',
    width: '100%',
    marginLeft: '40px'
}))

export const SingleItemTitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: '32px',
    fontWeight: '700',
    marginTop: '26px'
}))

export const SingleItemText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: '17px',
    padding: '16px 0',
}))

export const SingleItemDetailsBox = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
}))

export const SingleItemDetails = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: '15px',
}))

export const SingleItemCatBox = styled(Box)(({ theme }) => ({
    maxWidth: '120px',
    width: '100%',
    borderRadius: '12px',
    backgroundColor: theme.palette.background.card,
    textAlign: 'center',
    margin: '19px 0',
}))

export const SingleItemCatName = styled(Typography)(() => ({
    fontSize: '15px',
}))

export const AddBasketButton = styled(Button)(() => ({
    maxWidth: 290,
    width: '100%',
    padding: '10px 0',
    margin: '26px 0',
}));
