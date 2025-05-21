import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import CarouselItem from '../carousel-item';
import { AppDispatch } from '../../store/store';
import { fetchBestSellerRequest, selectCatalog } from '../../store/slice/catalog/catalog.slice';
import { IProduct } from '../../types/catalog.interface';
import {
    BestSellerBox,
    BestSellerTitle,
    StyledButton,
    StyledButtonGroup,
    StyledSlider,
    StyledSliderBox,
    TypesBox
} from '../../styles/BestSeller.styles';


const BestSeller = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { bestSeller, loading, error } = useSelector(selectCatalog);

    const [selectedCategory, setSelectedCategory] = useState('');

    const categories: string[] = useMemo((): string[] => {
        const uniqueCategories = new Set(bestSeller.map((item: IProduct) =>
            item.category.name));
        return Array.from(uniqueCategories);
    }, [bestSeller]);

    useEffect((): void => {
        dispatch(fetchBestSellerRequest());
    }, [dispatch]);

    useEffect((): void => {
        if (categories.length > 0 && !selectedCategory) {
            setSelectedCategory(categories[0]);
        }
    }, [categories, selectedCategory]);

    const filteredItems: IProduct[] = useMemo((): IProduct[] => {
        return bestSeller.filter((item: IProduct): boolean => item.category.name === selectedCategory);
    }, [bestSeller, selectedCategory]);

    const settings = useMemo(() => {
        const slidesCount: number = filteredItems.length;

        return {
            dots: false,
            infinite: slidesCount > 4,
            speed: 500,
            slidesToShow: Math.min(3, slidesCount),
            slidesToScroll: 1,
            arrows: true,
            responsive: [
                { breakpoint: 1200, settings: { slidesToShow: Math.min(2, slidesCount) } },
                { breakpoint: 900, settings: { slidesToShow: Math.min(1, slidesCount) } },
                { breakpoint: 600, settings: { slidesToShow: 1 } },
            ],
        };
    }, [filteredItems]);

    if (loading || error) {
        return null;
    }

    return (
        <BestSellerBox>
            <BestSellerTitle>
                Best Selling Product
            </BestSellerTitle>
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
        </BestSellerBox>
    );
};

export default BestSeller;