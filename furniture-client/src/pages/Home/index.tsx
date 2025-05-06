import React from 'react';

import Hero from '../../components/hero';
import Footer from '../../components/footer';
import MaterialsInfo from '../../components/materials-info';


const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <MaterialsInfo />
            <Footer />
        </>
    );
};


export default Home;