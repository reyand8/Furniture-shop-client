import {Box, Paper, styled, Typography} from '@mui/material';
import theme from "../assets/theme";



export const UserAccordionTitle = styled(Typography)(({ theme }) => ({
    fontSize: '18px',
    fontWeight: 700,
    color: theme.palette.text.secondary,
}));

export const UserListItemInfo = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    gap: '36px',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        gap: '0',
    },
}));

export const UserListItemName = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '160px',
    width: '100%',
    [theme.breakpoints.down('md')]: {
        maxWidth: '120px',
    },
}));

export const CategoryListAdminSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '400px',
    marginBottom: '16px',
    padding: '8px',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '8px',
    backgroundColor: theme.palette.background.paper,
}));

export const AllCategoriesBox = styled(Box)(({ theme }) => ({
    maxHeight: '520px',
    overflowY: 'scroll',
    marginTop: '26px',
    maxWidth: '420px',
    width: '100%',
    paddingRight: '46px',
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.background.group,
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: theme.palette.background.default,
    },
}));

export const CategoryItemAdminText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '200px',
}));

export const ProductItemAdminSection = styled(Box)(({ theme }) => ({
    marginTop: '16px',
    maxWidth: '720px',
    width: '100%',
}));

export const ProductItemAdminPaper = styled(Paper)(({ theme }) => ({
    padding: '14px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexDirection: 'row',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'center',
    },
}));


export const AllProductsAdminSection = styled(Box)(({ theme }) => ({
    maxHeight: '520px',
    overflowY: 'scroll',
    maxWidth: '740px',
    width: '100%',
    paddingRight: '46px',
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.background.group,
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: theme.palette.background.default,
    },
}));


export const AllCategoriesSection = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}));

export const ProductCreateCheckboxSection = styled(Box)(() => ({
    display: 'flex',
    gap: '16px',
    marginTop: '8px',
}));

