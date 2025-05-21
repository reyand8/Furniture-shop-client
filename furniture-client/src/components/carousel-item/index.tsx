import { Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import {
    CarouselImageBox,
    CarouselItemBox,
    CarouselItemName,
    IconCrossBox
} from '../../styles/CarouselItem.styles';
import { IProduct } from '../../types/catalog.interface';


const CarouselItem = (item: IProduct)=>  {
    const { name, images, discountPrice, price, currency } = item;
    return (
        <CarouselItemBox sx={{ maxWidth: '300px', width: '100%', mx: 'auto' }}>
            <CarouselImageBox className="carousel-image">
                <Box
                    component="img"
                    src={images[0]}
                    alt={name}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            </CarouselImageBox>
            <CarouselItemName variant="h5">{name}</CarouselItemName>
            <Box sx={{height: '42px'}}>
                {
                    discountPrice ? (
                        <Box>
                            <Typography color="error">
                                New lower price
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {discountPrice} {currency}
                            </Typography>
                        </Box>
                    ) : (
                        <Box>
                            <Typography variant="body1" color="text.secondary">
                                {price} {currency}
                            </Typography>
                        </Box>
                    )
                }
            </Box>
            <IconCrossBox className="icon-cross">
                <AddIcon fontSize="medium" />
            </IconCrossBox>
        </CarouselItemBox>
    );
};

export default CarouselItem;
