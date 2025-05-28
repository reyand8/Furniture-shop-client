import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import CarouselItem from '../carousel-item';
import { AppDispatch } from '../../store/store';
import { fetchBestSellersRequest, selectCatalog } from '../../store/slice/catalog/catalog.slice';
import { IProduct } from '../../types/catalog.interface';
import {
    OfferBox,
    OfferTitle,
    StyledButton,
    StyledButtonGroup,
    StyledSlider,
    StyledSliderBox,
    TypesBox
} from '../../styles/BestSeller.styles';
import { carouselSettings } from '../../common/utils/carousel-settings';


const BestSeller = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { bestSellers, loading, error } = useSelector(selectCatalog);

    const [selectedCategory, setSelectedCategory] = useState('');

    const categories: string[] = useMemo((): string[] => {
        const uniqueCategories = new Set(bestSellers.map((item: IProduct) =>
            item.category.name));
        return Array.from(uniqueCategories);
    }, [bestSellers]);

    useEffect((): void => {
        dispatch(fetchBestSellersRequest());
    }, [dispatch]);

    useEffect((): void => {
        if (categories.length > 0 && !selectedCategory) {
            setSelectedCategory(categories[0]);
        }
    }, [categories, selectedCategory]);

    const filteredItems: IProduct[] = useMemo((): IProduct[] => {
        return bestSellers.filter((item: IProduct): boolean => item.category.name === selectedCategory);
    }, [bestSellers, selectedCategory]);

    const settings = useMemo(() => {
        return carouselSettings({ itemCount: filteredItems.length });
    }, [filteredItems]);

    if (loading || error) {
        return null;
    }

    if (bestSellers.length < 1) return null;

    return (
        <OfferBox>
            <OfferTitle>
                Best Selling Product
            </OfferTitle>
            <TypesBox>
                <StyledButtonGroup>
                    {categories.map((category: string) => (
                        <StyledButton
                            key={category}
                            onClick={(): void => setSelectedCategory(category)}
                            isSelected={selectedCategory === category}
                        >
                            {category}
                        </StyledButton>
                    ))}
                </StyledButtonGroup>
            </TypesBox>
            <StyledSliderBox>
                <StyledSlider {...settings}>
                    {filteredItems.map((product: IProduct) => (
                        <CarouselItem
                            key={product.id}
                            {...product}
                        />
                    ))}
                </StyledSlider>
            </StyledSliderBox>
        </OfferBox>
    );
};

export default BestSeller;