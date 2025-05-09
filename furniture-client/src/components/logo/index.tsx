import { Box } from '@mui/material';

import { LogoTypography, StyledLink } from '../../styles/Header.styles';
import theme from '../../assets/theme';


export const Logo = () => (
    <Box sx={{ display: 'flex'}}>
        <StyledLink to="/">
            <LogoTypography>Furni</LogoTypography>
            <LogoTypography sx={{ color: theme.palette.text.tertiary }}>.</LogoTypography>
        </StyledLink>
    </Box>
);
