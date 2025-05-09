import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';

import {
    HeroBox,
    HeroItemsBox,
    HeroTitle,
    HeroSubTitle,
    SearchBox,
    SearchTextField,
    SearchBtnBox,
} from '../../styles/Hero.styles';
import Header from '../header';
import theme from '../../assets/theme';


const Hero: React.FC = () => {
    return (
        <HeroBox>
            <Header/>
            <HeroItemsBox>
                <HeroTitle>
                    Make Your Interior More Minimalistic & Modern
                </HeroTitle>
                <HeroSubTitle>
                    Turn your room with panto into a lot more minimalist
                    and modern with ease and speed
                </HeroSubTitle>
                <SearchBox>
                    <SearchTextField
                        variant="outlined"
                        placeholder="Search..."
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <SearchBtnBox>
                                        <SearchIcon sx={{
                                            color: theme.palette.text.primary,
                                            fontSize: '26px'
                                        }}/>
                                    </SearchBtnBox>
                                </InputAdornment>
                            )
                        }}
                    />
                </SearchBox>
            </HeroItemsBox>
        </HeroBox>
    );
}

export default Hero;