import React from 'react';
import { Box } from '@mui/material';
import { Link as MuiLink } from '@mui/material';

import {
    FooterAllIconsBox,
    FooterBox,
    FooterFollowBox,
    FooterFollowText,
    FooterIconBox,
    FooterLogoBox
} from '../../styles/Footer.styles';
import twitter from '../../assets/img/twitter.svg';
import instagram from '../../assets/img/instagram.svg';
import facebook from '../../assets/img/facebook.svg';
import { Logo } from '../logo';


const Footer: React.FC = () => {
    return (
        <FooterBox>
            <FooterLogoBox>
                <Logo />
                <Box sx={{lineHeight: 1.8}}>
                    From classic to contemporary, we provide the finest furniture
                    hardware to suit every style and make every space feel like home
                </Box>
            </FooterLogoBox>
            <FooterFollowBox>
                <FooterFollowText>Follow Us</FooterFollowText>
                <FooterAllIconsBox>
                    <MuiLink href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <FooterIconBox src={instagram} alt="Instagram" />
                    </MuiLink>
                    <MuiLink href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                        <FooterIconBox src={twitter} alt="Twitter" />
                    </MuiLink>
                    <MuiLink href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <FooterIconBox src={facebook} alt="Facebook" />
                    </MuiLink>
                </FooterAllIconsBox>
            </FooterFollowBox>
        </FooterBox>
    )
}

export default Footer;