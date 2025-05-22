import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import CarouselItem from '../carousel-item';
import { AppDispatch } from '../../store/store';
import { fetchRelativeRequest, selectCatalog } from '../../store/slice/catalog/catalog.slice';
import { IProduct } from '../../types/catalog.interface';
import {
    OfferBox,
    OfferTitle,
    StyledSlider,
    StyledSliderBox,
} from '../../styles/BestSeller.styles';
import { carouselSettings } from '../../common/utils/carousel-settings';
import { IRelativeProductsProps } from '../../types/props.interface';
import Loading from '../status/loading';


const RelativeProducts: React.FC<IRelativeProductsProps> = ({ type }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { relative, errorRelative, loadingRelative } = useSelector(selectCatalog);

    useEffect((): void => {
        if (type) {
            dispatch(fetchRelativeRequest({type}));
        }
    }, [dispatch, type]);

    const settings = useMemo(() => {
        return carouselSettings({ itemCount: relative?.length || 1 });
    }, [relative]);

    if (loadingRelative) {
        return <Loading />;
    }

    if (errorRelative) {
        return null;
    }

    return (
        <OfferBox>
            <OfferTitle>
                Relative Products
            </OfferTitle>
            <StyledSliderBox>
                <StyledSlider {...settings}>
                    {relative.map((product: IProduct) => (
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

export default RelativeProducts;