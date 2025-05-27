import {
    Box, Dialog, DialogContent,
    styled, TextField, Typography
} from '@mui/material';


export const CreateOrderItemsSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    [theme.breakpoints.down('lg')]: {
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

export const CreateOrderTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    fontSize: '29px',
    color: theme.palette.text.secondary,
    margin: '20px auto'
}))

export const CreateOrderMainSection = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    margin: '80px 20px 90px 40px',
}));

export const OrderItemsMainBox = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '32px',
}));

export const SelectedOrderItemsTitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.success.main,
    fontSize: '26px',
    marginLeft: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
}))

export const SelectOrderTitle = styled(Typography, {
    shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected?: boolean }>(({ theme, isSelected }) => ({
    color: isSelected ? theme.palette.success.main : theme.palette.text.secondary,
    fontSize: '26px',
    paddingBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
}));

export const InputNotesField = styled(TextField)(({ theme }) => ({
    marginBottom: '16px',
    maxWidth: '340px',
    width: '100%',
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
    },
    '& .MuiInputBase-input': {
        color: theme.palette.text.secondary,
    },
}))

export const OrderItemName = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontWeight: 700,
    fontSize: '19px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '190px',
    width: '100%',
}));

export const OrderAllItemsBox = styled(Box)(({ theme }) => ({
    maxHeight: '890px',
    width: '520px',
    overflowY: 'scroll',
    marginTop: '32px',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    scrollbarWidth: 'auto',
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

export const OrderItemMain = styled(Box)(({ theme }) => ({
    padding: 2,
    border: `1px solid ${theme.palette.background.group}`,
    borderRadius: '8px',
    maxWidth: '460px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

export const OrderSuccessDialog = styled(Dialog)(() => ({
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto'
}));

export const OrderSuccessDialogContent = styled(DialogContent)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));