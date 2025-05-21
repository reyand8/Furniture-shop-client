import React from 'react';

import {
    HeroBox,
    HeroItemsBox,
    HeroTitle,
    HeroSubTitle,
} from '../../styles/Hero.styles';
import Header from '../header';
import Search from '../search';


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
                <Search />
            </HeroItemsBox>
        </HeroBox>
    );
}

export default Hero;