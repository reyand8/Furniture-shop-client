import React, {useCallback, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box, Button, Checkbox, Divider,
    FormControlLabel, FormGroup,
    Slider, Typography
} from '@mui/material';

import {
    FilterBtnsBox,
    FilterButton,
    FilterPriceRange,
    FiltersBox,
    FiltersTitle
} from '../../../styles/Filters.styles';
import {
    fetchAllProductsRequest,
    fetchCategoriesRequest,
    selectCatalog,
    setFilters,
} from '../../../store/slice/catalog/catalog.slice';
import { AppDispatch } from '../../../store/store';
import Loading from '../../status/loading';
import { ICategory } from '../../../types/catalog.interface';
import {DEFAULT_MAX_FILTER, DEFAULT_MIN_FILTER, DEFAULT_RANGE_FILTER} from "../../../common/common-items";


const CatalogFilters: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const {
        categories,
        loadingCategories,
        errorCategories,
        selectedCategory,
        minPrice,
        maxPrice
    } = useSelector(selectCatalog);

    const [localCategory, setLocalCategory] = useState<string | null>(selectedCategory);
    const [localPriceRange, setLocalPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
    const [minSelectedPrice, maxSelectedPrice] = Array.isArray(localPriceRange)
        ? [Math.min(localPriceRange[0] ?? 0, localPriceRange[1] ?? 0),
            Math.max(localPriceRange[0] ?? 0, localPriceRange[1] ?? 0)] : [0, 0];

    useEffect((): void => {
        dispatch(fetchCategoriesRequest());
    }, [dispatch]);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalCategory(event.target.checked ? event.target.value : null);
    };

    const handlePriceRangeChange = (_: Event, newValue: number | number[]) => {
        if (Array.isArray(newValue) && newValue.length > 0) {
            setLocalPriceRange([newValue[0], newValue[1]]);
        }
    };

    const applyFilters = useCallback((category: string | null, range: [number, number]) => {
        dispatch(setFilters({
            selectedCategory: category,
            minPrice: range[0],
            maxPrice: range[1],
        }));

        dispatch(fetchAllProductsRequest({
            ...(category ? { category } : {}),
            minPrice: range[0],
            maxPrice: range[1],
            page: 1,
            pageSize: 10,
        }));
    }, [dispatch]);

    const handleFilterClick = () => {
        applyFilters(localCategory, localPriceRange);
    };

    const handleResetClick = () => {
        setLocalCategory(null);
        setLocalPriceRange(DEFAULT_RANGE_FILTER);
        applyFilters(null, DEFAULT_RANGE_FILTER);
    };


    return (
        <FiltersBox>
            {loadingCategories && (
                <Box sx={{ height: '560px' }}>
                    <Loading />
                </Box>
            )}
            {!loadingCategories && !errorCategories && categories.length > 0 && (
                <>
                    <FiltersTitle variant="h5">
                        Categories
                    </FiltersTitle>
                    <FormGroup sx={{ mb: 3 }}>
                        {categories.map((cat: ICategory) => (
                            <FormControlLabel
                                key={cat.id}
                                control={
                                    <Checkbox
                                        checked={localCategory === cat.id}
                                        onChange={handleCategoryChange}
                                        value={cat.id}
                                    />
                                }
                                label={
                                    <Typography sx={{ color: 'text.secondary' }}>
                                        {cat.name}
                                    </Typography>
                                }
                            />
                        ))}
                    </FormGroup>

                    <Divider sx={{ mb: 3 }} />

                    <FiltersTitle variant="h5">
                        Filter By Price
                    </FiltersTitle>
                    <FilterPriceRange variant="body1" sx={{ mb: 2 }}>
                        From ${minSelectedPrice} to ${maxSelectedPrice}
                    </FilterPriceRange>

                    <Box sx={{ width: 250, mb: 2 }}>
                        <Slider
                            value={localPriceRange}
                            onChange={handlePriceRangeChange}
                            valueLabelDisplay="auto"
                            min={DEFAULT_MIN_FILTER}
                            max={DEFAULT_MAX_FILTER}
                            step={10}
                        />
                    </Box>

                    <FilterBtnsBox>
                        <FilterButton variant="outlined" onClick={handleFilterClick}>
                            Filter
                        </FilterButton>
                        <Button variant="text" onClick={handleResetClick}>
                            Reset
                        </Button>
                    </FilterBtnsBox>
                </>
            )}
        </FiltersBox>
    );
};

export default CatalogFilters;
