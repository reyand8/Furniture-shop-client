import { ICarouselSettingsParams } from '../../../types/props.interface';


export const carouselSettings = ({
                                        itemCount,
                                        maxVisibleSlides = 3,
                                        infiniteThreshold = 4,
                                    }: ICarouselSettingsParams) => {
    return {
        dots: false,
        infinite: itemCount > infiniteThreshold,
        speed: 500,
        slidesToShow: Math.min(maxVisibleSlides, itemCount),
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: Math.min(2, itemCount),
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: Math.min(1, itemCount),
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };
};
