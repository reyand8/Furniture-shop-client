import React, { useEffect } from 'react';
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

    useEffect((): void => {
        dispatch(fetchAllProductsRequest({
            page: 1,
            pageSize: PAGE_SIZE_CATALOG,
            ...(selectedCategory ? { category: selectedCategory } : {}),
            minPrice,
            maxPrice,
        }));
    }, [dispatch, selectedCategory, minPrice, maxPrice]);

    const handleNextPage = (): void => {
        if (currentPage < totalPages) {
            dispatch(fetchAllProductsRequest({
                page: currentPage + 1,
                pageSize: PAGE_SIZE_CATALOG,
                ...(selectedCategory ? { category: selectedCategory } : {}),
                minPrice,
                maxPrice
            }));
        }
    };

    const handlePrevPage = (): void => {
        if (currentPage > 1) {
            dispatch(fetchAllProductsRequest({
                page: currentPage - 1,
                pageSize: PAGE_SIZE_CATALOG,
                ...(selectedCategory ? { category: selectedCategory } : {}),
                minPrice,
                maxPrice
            }));
        }
    };

    const isEmpty: boolean = !loading && !error && allProducts.length === 0;
    const hasData: boolean = !loading && !error && allProducts.length > 0;

    return (
        <Box sx={{margin: '52px auto'}}>
            {loading && <Loading />}
            {isEmpty && (
                <Empty />
            )}
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