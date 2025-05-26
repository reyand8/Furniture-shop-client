import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Container, Drawer, IconButton, Box } from '@mui/material';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';

import theme from '../../assets/theme';
import {
    StyledLink,
    MenuNavItem,
    IconBox,
    HeaderToolbar
} from '../../styles/Header.styles';
import BurgerMenu from './burgerMenu';
import { navItems } from '../../common/navItems';
import { Logo } from '../logo';
import { PATHS } from '../../routes/paths';

const { BASKET, PROFILE } = PATHS;

const Header: React.FC = () => {
    const location = useLocation();

    const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);

    const handleDrawerToggle = (): void => {
        setDrawerOpen((prev: boolean): boolean => !prev);
    };

    return (
        <AppBar position="static"
                sx={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
        }}>
            <Container>
                <HeaderToolbar disableGutters>
                    <Logo />
                    <Box sx={{display: {xs: 'none', md: 'flex',}, gap: theme.spacing(15)}} >
                        <Box sx={{ display: 'flex', width: '440px' }}>
                            {navItems.map((item:{ label: string, path: string }) => (
                                <MenuNavItem
                                    key={item.label}
                                    component={Link}
                                    to={item.path}
                                    active={location.pathname === item.path}
                                    disableRipple
                                >
                                    {item.label}
                                </MenuNavItem>
                            ))}
                        </Box>
                        <IconBox>
                            <StyledLink to={BASKET}>
                                <LocalMallIcon sx={{ fontSize: 36 }}/>
                            </StyledLink>
                            <StyledLink to={PROFILE}>
                                <PersonIcon sx={{ fontSize: 42, paddingTop: '2px' }} />
                            </StyledLink>
                        </IconBox>
                    </Box>
                    <Box sx={{display: { xs: 'block', md: 'none'}}}>
                        <IconButton
                            onClick={handleDrawerToggle}
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton>
                    </Box>

                    <Drawer
                        anchor="right"
                        open={isDrawerOpen}
                        onClose={(): void => setDrawerOpen(false)}>
                        <BurgerMenu/>
                    </Drawer>

                </HeaderToolbar>
            </Container>
        </AppBar>
    )
}

export default Header;