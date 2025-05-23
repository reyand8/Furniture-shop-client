import { Box, styled } from '@mui/material';


export const CatalogPageBox= styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('lg')]: {
        flexDirection: 'column',
    },
}));

export const CatalogDataBox= styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}));

export const CatalogProductsBox = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '42px',
    maxWidth: '1260px',
    width: '100%',

    [theme.breakpoints.down('lg')]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr',
    },
}));