import {Box, Button, styled, Typography} from "@mui/material";



export const FiltersBox= styled(Box)(() => ({
    maxWidth: '250px',
    width: '100%',
    padding: '16px',
    margin: '32px 10px 42px 32px',
}));

export const FiltersTitle= styled(Typography)(({theme}) => ({
    color: theme.palette.text.secondary,
    paddingBottom: '16px',
}));

export const FilterBtnsBox= styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    marginTop: '48px'
}));

export const FilterButton= styled(Button)(() => ({
    maxWidth: '120px',
    width: '100%'
}));

export const FilterPriceRange= styled(Typography)(({theme}) => ({
    color: theme.palette.text.secondary,
    marginTop: '16px',
    textAlign: 'center',
}));

