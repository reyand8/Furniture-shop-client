import { Link, LinkProps } from 'react-router-dom';
import {
    Button, ButtonProps, List,
    styled, Toolbar, Box
} from '@mui/material';


export const HeaderToolbar = styled(Toolbar)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

export const StyledLink = styled(Link)<LinkProps>(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: theme.palette.text.primary,
}));

export const LogoTypography = styled(Box)(({ theme }) => ({
    fontStyle: 'italic',
    fontWeight: 700,
    fontSize: '62px',
    color: theme.palette.text.primary,
}));

export const MenuNavItem = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'active',
})<ButtonProps & { to?: string; active?: boolean }>(({ theme, active }) => ({
    position: 'relative',
    display: 'flex',
    color: theme.palette.text.primary,
    textTransform: 'none',
    fontSize: '17px',
    fontWeight: 400,
    marginRight: theme.spacing(3.25),
    backgroundColor: 'transparent',
    '&::after': {
        content: '""',
        position: 'absolute',
        left: 0,
        bottom: -1,
        width: active ? '100%' : '0%',
        height: '2px',
        backgroundColor: theme.palette.primary.main,
        transition: 'width 0.4s ease-in-out',
    },
    '&:hover::after': {
        width: '100%',
    },
    '&:hover': {
        backgroundColor: 'transparent',
    },
}));

export const IconBox = styled(Box)(({ theme }) => ({
    display:'flex',
    alignItems: 'center',
    gap: theme.spacing(3.5),
    marginTop: theme.spacing(1.5),
}));

export const BurgerList = styled(List)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
}))

export const HeaderBox = styled(Box)(({theme}) => ({
    backgroundColor: theme.palette.background.headerFooterBg,
}))