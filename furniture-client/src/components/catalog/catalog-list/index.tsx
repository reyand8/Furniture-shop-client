import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';

import { fetchAllProductsRequest, selectCatalog } from '../../../store/slice/catalog/catalog.slice';
import { CatalogDataBox, CatalogProductsBox } from '../../../styles/Catalog.styles';
import { AppDispatch } from '../../../store/store';
import { IProduct } from '../../../types/catalog.interface';
import { PAGE_SIZE_CATALOG } from '../../../common/common-items';
import CarouselItem from '../../carousel-item';
import Loading from '../../status/loading';
import ErrorInfo from '../../status/error';
import Pagination from '../../pagination';
import Empty from '../../status/empty';


const CatalogList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        allProducts, totalPages, currentPage,
        loading, error, selectedCategory,
        minPrice, maxPrice
    } = useSelector(selectCatalog);

    const queryParams = {
        pageSize: PAGE_SIZE_CATALOG,
        ...(selectedCategory ? { category: selectedCategory } : {}),
        minPrice,
        maxPrice,
    };

    useEffect((): void => {
        dispatch(fetchAllProductsRequest({
            page: currentPage,
            ...queryParams
        }));
    }, [dispatch, selectedCategory, minPrice, maxPrice, currentPage]);

    const handleNextPage = useCallback((): void => {
        if (currentPage < totalPages && !loading) {
            dispatch(fetchAllProductsRequest({
                page: currentPage + 1,
                ...queryParams
            }));
        }
    }, [currentPage, totalPages, dispatch, selectedCategory, minPrice, maxPrice, loading]);

    const handlePrevPage = useCallback((): void => {
        if (currentPage > 1 && !loading) {
            dispatch(fetchAllProductsRequest({
                page: currentPage - 1,
                ...queryParams
            }));
        }
    }, [currentPage, dispatch, selectedCategory, minPrice, maxPrice, loading]);

    const isEmpty: boolean = !loading && !error && allProducts.length === 0;
    const hasData: boolean = !loading && !error && allProducts.length > 0;

    return (
        <Box sx={{margin: '52px auto'}}>
            {loading && <Loading />}
            {isEmpty && <Empty />}
            {error && <ErrorInfo />}

            {hasData && (
                <CatalogDataBox>
                    <CatalogProductsBox>
                        {allProducts.map((product: IProduct) => (
                            <Box key={product.id}>
                                <CarouselItem {...product} />
                            </Box>
                        ))}
                    </CatalogProductsBox>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPrev={handlePrevPage}
                        onNext={handleNextPage}
                    />
                </CatalogDataBox>
            )}
        </Box>
    );
};


export default CatalogList;