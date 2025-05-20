import { Box, Button, styled, Typography } from '@mui/material';


export const ContactInfoAddBox = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
}));

export const OpenContactInfoFormBtn = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.background.group,
    maxWidth: '620px',
    width: '100%',
}));

export const ContactInfoForm = styled('form')(({ theme }) => ({
    maxWidth: '620px',
    width: '100%',
    [theme.breakpoints.down('md')]: {
        maxWidth: '320px',
    },
    [theme.breakpoints.down('xs')]: {
        margin: '0 auto',
        maxWidth: '220px',
    },
}));

export const ContactInfoItemMain = styled(Box)(({ theme }) => ({
    padding: 2,
    border: `1px solid ${theme.palette.background.group}`,
    borderRadius: '8px',
    maxWidth: '320px',
    width: '100%',
}));

export const ContactInfoItemInfo = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: theme.spacing(0.5, 2),
}));

export const ContactInfoAllItemsBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: theme.spacing(1.5),
    maxHeight: '600px',
    overflowY: 'auto',
    marginTop: theme.spacing(4.25),
}));

export const PaginationBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(3.5),
    gap: theme.spacing(2),
}));


export const ContactInfoItemAddress = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: '16px',
    fontWeight: 700,
}));

export const ContactInfoItemCity = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: '14px',
}));

export const ContactInfoItemBtns = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginTop: theme.spacing(4.75),
}));

export const EmptySectionBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(0.75),
}));
