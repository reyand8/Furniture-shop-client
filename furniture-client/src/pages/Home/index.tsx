import React from 'react';

import Hero from '../../components/hero';
import Footer from '../../components/footer';
import MaterialsInfo from '../../components/materials-info';
import BestSeller from '../../components/best-seller';


const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <MaterialsInfo />
            <BestSeller />
            <Footer />
        </>
    );
};


export default Home;