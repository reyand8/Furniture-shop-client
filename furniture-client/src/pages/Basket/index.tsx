import React from 'react';

import { HeaderBox } from '../../styles/Header.styles';
import Header from '../../components/header';
import Footer from '../../components/footer';
import BasketInfo from '../../components/basket-info';


const Basket: React.FC = () => {
    return (
        <>
            <HeaderBox>
                <Header/>
            </HeaderBox>
            <BasketInfo/>
            <Footer/>
        </>
    );
};

export default Basket;