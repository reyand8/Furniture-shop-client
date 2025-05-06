import React from 'react';
import { Box, Link } from '@mui/material';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PersonIcon from '@mui/icons-material/Person';

import {
    BurgerList,
    IconBox,
    MenuNavItem,
    StyledLink
} from '../../../styles/Header.styles';
import theme from '../../../assets/theme';
import { navItems } from '../../../common/navItems';


const BurgerMenu: React.FC = () => (
    <Box sx={{ width: 190, ml: 3 }} role="presentation">
        <BurgerList>
            {navItems.map((item: { label: string, path: string }) => (
                <MenuNavItem
                    key={item.label}
                    component={Link}
                    to={item.path}
                    disableRipple
                    sx={{ color: theme.palette.text.secondary }}
                >
                    {item.label}
                </MenuNavItem>
            ))}
            <IconBox>
                <Box>
                    <StyledLink to="/basket">
                        <LocalMallIcon sx={{ fontSize: 36, color: theme.palette.primary.main }} />
                    </StyledLink>
                </Box>
                <Box>
                    <StyledLink to="/profile">
                        <PersonIcon sx={{ fontSize: 42, color: theme.palette.primary.main}} />
                    </StyledLink>
                </Box>
            </IconBox>
        </BurgerList>
    </Box>
);

export default BurgerMenu;