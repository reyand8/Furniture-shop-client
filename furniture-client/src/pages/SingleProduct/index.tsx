import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../components/header';
import Footer from '../../components/footer';
import { AppDispatch } from '../../store/store';
import {
    fetchSingleProductRequest,
    selectCatalog
} from '../../store/slice/catalog/catalog.slice';
import { HeaderBox } from '../../styles/Header.styles';
import SingleItemProduct from '../../components/single-item-product';
import NotFound from '../NotFound';
import RelativeProducts from '../../components/relative-products';


const SingleProduct: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { singleProduct, errorSingle } = useSelector(selectCatalog);
    const { id } = useParams();

    useEffect((): void => {
        if (id) {
            dispatch(fetchSingleProductRequest(id));
        }
    }, [dispatch, id]);

    return (
        <>
            <HeaderBox>
                <Header />
            </HeaderBox>
            { errorSingle ? (
                <NotFound />
            ) : (
                <>
                    <SingleItemProduct item={singleProduct} />
                    <RelativeProducts type={singleProduct?.type} />
                </>
            )}
            <Footer/>
        </>
    );
};

export default SingleProduct;