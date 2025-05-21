import React from 'react';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Box } from '@mui/material';
import {
    AboutItemBox,
    AboutWelcomeBox,
    AdvantageContainer,
    AdvantageItem,
    AdvantageText,
    ImageStyled,
    SectionText,
    SectionTitle
} from '../../styles/About.styles';
import Header from '../../components/header';
import Footer from '../../components/footer';
import theme from '../../assets/theme';

import aboutUsOne from '../../assets/img/about1.jpg'
import aboutUsTwo from '../../assets/img/about2.png'
import aboutUsThree from '../../assets/img/about3.png'
import aboutUsFour from '../../assets/img/about4.jpg'


const About: React.FC = () => {
    return (
        <Box>
            <Box sx={{ backgroundColor: theme.palette.background.headerFooterBg }}>
                <Header />
            </Box>
            <Box>
                <AboutItemBox>
                    <AboutWelcomeBox>
                        <SectionTitle variant="subtitle1">Welcome to Furni.</SectionTitle>
                        <SectionText>
                            Your go-to destination for high-quality hardware and accessories
                            that bring function and style together.
                        </SectionText>
                    </AboutWelcomeBox>
                    <ImageStyled src={aboutUsOne} alt="About Furni" />
                </AboutItemBox>

                <AdvantageContainer>
                    <AdvantageItem>
                        <ThumbUpIcon fontSize="large" />
                        <AdvantageText>300+ satisfied customers across the country</AdvantageText>
                    </AdvantageItem>
                    <AdvantageItem>
                        <SupportAgentIcon fontSize="large" />
                        <AdvantageText>Quality guarantee on all products</AdvantageText>
                    </AdvantageItem>
                    <AdvantageItem>
                        <LocalShippingIcon fontSize="large" />
                        <AdvantageText>Fast and reliable delivery starting from 1 day</AdvantageText>
                    </AdvantageItem>
                </AdvantageContainer>

                <AboutItemBox>
                    <ImageStyled src={aboutUsTwo} alt="Who We Are" />
                    <AboutWelcomeBox>
                        <SectionTitle variant="subtitle1">Who We Are</SectionTitle>
                        <SectionText>
                            We are a team of professionals passionate about the details that make
                            interiors practical, durable, and beautiful. Our store offers a carefully
                            curated selection of furniture hardware, door fittings, cabinet components,
                            and custom accessories for any type of project – from small home improvements
                            to large commercial renovations.
                        </SectionText>
                    </AboutWelcomeBox>
                </AboutItemBox>

                <AboutItemBox reverse>
                    <AboutWelcomeBox>
                        <SectionTitle variant="subtitle1">Our Story</SectionTitle>
                        <SectionText>
                            Founded with the idea that quality should be accessible, Furni. started
                            as a small local store and grew into a specialized platform trusted by
                            professionals and homeowners alike. Today, we continue to expand our catalog,
                            stay updated with design trends, and focus on bringing innovative hardware to
                            our customers.
                        </SectionText>
                    </AboutWelcomeBox>
                    <ImageStyled src={aboutUsThree} alt="Our Story" />
                </AboutItemBox>

                <AboutItemBox>
                    <ImageStyled src={aboutUsFour} alt="Our Mission" />
                    <AboutWelcomeBox>
                        <SectionTitle variant="subtitle1">Our Mission</SectionTitle>
                        <SectionText>
                            To help you build better spaces by offering the best in hardware design,
                            functionality, and durability. We believe that the right hardware doesn’t
                            just hold things together — it adds value, comfort, and a unique character
                            to any environment.
                        </SectionText>
                    </AboutWelcomeBox>
                </AboutItemBox>
            </Box>
            <Footer />
        </Box>

    );
};

export default About;