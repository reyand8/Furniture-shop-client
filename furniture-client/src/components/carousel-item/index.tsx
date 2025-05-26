import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';

import {
    CarouselImageBox,
    CarouselItemBox,
    CarouselItemName,
    IconCrossBox
} from '../../styles/CarouselItem.styles';
import { IProduct } from '../../types/catalog.interface';
import { addToBasket } from '../../common/utils/basket/basket';
import noImg from '../../assets/img/noImg.png'


const CarouselItem = (item: IProduct)=>  {
    const { id, name, images, discountPrice, price, currency } = item;

    const [added, setAdded] = useState(false);

    const handleAddToBasket = (): void => {
        addToBasket(id);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    return (
        <CarouselItemBox>
            <Link to={`/single-product/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <CarouselImageBox className="carousel-image">
                    <Box
                        component="img"
                        src={images[0] || noImg}
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
            </Link>
            <IconCrossBox onClick={handleAddToBasket} className="icon-cross">
                {added ? <DoneIcon fontSize="medium" /> : <AddIcon fontSize="medium" />}
            </IconCrossBox>
        </CarouselItemBox>
    );
};

export default CarouselItem;
