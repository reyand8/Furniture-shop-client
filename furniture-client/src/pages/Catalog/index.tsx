import React from 'react';

import CatalogFilters from '../../components/catalog/catalog-filters';
import CatalogList from '../../components/catalog/catalog-list';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { CatalogPageBox } from '../../styles/Catalog.styles';
import {HeaderBox} from '../../styles/Header.styles';


const Catalog: React.FC = () => {
    return (
        <>
            <HeaderBox>
                <Header />
            </HeaderBox>
            <CatalogPageBox>
                <CatalogFilters />
                <CatalogList />
            </CatalogPageBox>
            <Footer />
        </>
    );
};

export default Catalog;