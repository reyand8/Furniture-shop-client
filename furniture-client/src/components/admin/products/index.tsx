import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';

import { AppDispatch } from '../../../store/store';
import theme from '../../../assets/theme';
import {
    fetchAllProductsRequest,
    selectCatalog,
} from '../../../store/slice/catalog/catalog.slice';
import Empty from '../../status/empty';
import Pagination from '../../pagination';
import ProductItem from './product-item';
import { AllProductsAdminSection } from '../../../styles/Admin.styles';
import ProductAdd from './product-add';
import { PAGE_SIZE_CATALOG_ADMIN } from '../../../common/common-items';
import Loading from '../../status/loading';
import ErrorInfo from '../../status/error';


const Products: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        allProducts,
        currentPage,
        totalPages,
        loading,
        error,
    } = useSelector(selectCatalog);

    useEffect((): void => {
        dispatch(fetchAllProductsRequest({ page: currentPage, pageSize: PAGE_SIZE_CATALOG_ADMIN }));
    }, [dispatch, currentPage]);

    const handleNextPage = useCallback((): void => {
        if (currentPage < totalPages && !loading) {
            dispatch(fetchAllProductsRequest({ page: currentPage + 1, pageSize: PAGE_SIZE_CATALOG_ADMIN }));
        }
    }, [currentPage, totalPages, dispatch, loading]);

    const handlePrevPage = useCallback((): void => {
        if (currentPage > 1 && !loading) {
            dispatch(fetchAllProductsRequest({ page: currentPage - 1, pageSize: PAGE_SIZE_CATALOG_ADMIN }));
        }
    }, [currentPage, dispatch, loading]);

    if (loading) return <Loading />;
    if (error) return <ErrorInfo />;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ color: theme.palette.text.secondary }}>
                Products
            </Typography>
            <Box sx={{my: 3, maxWidth: '400px', width: '100%'}}>
                <ProductAdd />
            </Box>
            <AllProductsAdminSection>
                {allProducts.length > 0 ? (
                    allProducts.map(product => (
                        <ProductItem item={product} key={product.id} />
                    ))
                ) : (
                    <Empty />
                )}
            </AllProductsAdminSection>

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPrev={handlePrevPage}
                    onNext={handleNextPage}
                />
            )}
        </Box>
    );
};

export default Products;
