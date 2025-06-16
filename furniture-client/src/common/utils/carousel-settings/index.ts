import { ICarouselSettingsParams } from '../../../types/props.interface';


/**
 * Returns carousel configuration based on item count and responsiveness.
 *
 * @param itemCount - Total number of items in the carousel.
 * @param maxVisibleSlides - Maximum number of visible slides (default: 3).
 * @param infiniteThreshold - Minimum item count to enable infinite scroll (default: 4).
 * @returns Slick carousel settings object.
 */
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
