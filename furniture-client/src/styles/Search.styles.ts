import { Box, List, ListItemText, styled, TextField } from '@mui/material';


export const SearchBox = styled(Box)(() => ({
    maxWidth: '364px',
    width: '100%',
    margin: '34px 0 290px 0',
}))

export const SearchTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        backgroundColor: theme.palette.background.card,
        borderRadius: '24px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.contrastText,
        borderWidth: '0.8px',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.contrastText,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.contrastText,
    },
    '& .MuiInputBase-input': {
        color: theme.palette.primary.contrastText,
    },
}))

export const SearchBtnBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '30px',
    backgroundColor: theme.palette.primary.main,
}))

export const SearchResultList = styled(List)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ccc',
    borderRadius: theme.shape.borderRadius,
    maxHeight: '300px',
    overflowY: 'auto',
    boxShadow: theme.shadows[3],
}));

export const ListItemSearchText = styled(ListItemText)(({ theme }) => ({
    color: theme.palette.text.secondary,
    cursor: 'pointer',
    transition: 'color 0.2s ease-in-out',
    '&:hover': {
        color: theme.palette.primary.main,
    },
}));

