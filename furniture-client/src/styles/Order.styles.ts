import {
    Box, Card, Dialog, DialogContent, ListItemButton,
    styled, TextField, Typography
} from '@mui/material';
import {IStyledProps} from "../types/props.interface";


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
    maxWidth: '520px',
    width: '100%',
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
    [theme.breakpoints.down('md')]: {
        maxWidth: '320px',
    },
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


export const OrderListItemButton = styled(ListItemButton, {
    shouldForwardProp: (prop) => prop !== 'selected',
})<IStyledProps>(({ theme, selected }) => ({
    backgroundColor: selected ? theme.palette.primary.main : theme.palette.primary.light,
    color: selected ? theme.palette.text.primary : 'inherit',
    borderRadius: theme.shape.borderRadius,
    opacity: 1,

    '&.Mui-selected': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.primary,
        opacity: 1,
    },
    '&.Mui-selected:hover': {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
    },
    '&:hover': {
        backgroundColor: selected ? theme.palette.primary.main : theme.palette.primary.light,
    },
    '&.Mui-disabled': {
        backgroundColor: theme.palette.grey[200],
        color: theme.palette.grey[500],
        opacity: 0.8,
    },
}));

export const OrderCard = styled(Card)(() => ({
    maxWidth: '490px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}));

export const OrderInfoAdminSection = styled(Box)(({theme}) => ({
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    mt: 4,
    [theme.breakpoints.down('lg')]: {
        flexDirection: 'column',
        alignItems: 'center',
    },
}));


export const OrderInfoAdminItemsSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(2.25),
    alignItems: 'stretch',
    maxHeight: '820px',
    overflowY: 'scroll',
    paddingRight: theme.spacing(1.75),
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