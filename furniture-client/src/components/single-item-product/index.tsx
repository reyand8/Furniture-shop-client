import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';

import { ISingleItemProduct } from '../../types/props.interface';
import {
    AddBasketButton, AllImagesBox, ImageItemBox,
    SelectedImageBox, SingleItemBox,
    SingleItemCatBox, SingleItemCatName,
    SingleItemDetails, SingleItemDetailsBox,
    SingleItemInfoBox, SingleItemText,
    SingleItemTitle
} from '../../styles/SingleItem.styles';
import { selectCatalog } from '../../store/slice/catalog/catalog.slice';
import Loading from '../status/loading';


const SingleItemProduct: React.FC<ISingleItemProduct> = ({ item }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { loadingSingle } = useSelector(selectCatalog)

    useEffect((): void => {
        if (item && item.images.length > 0) {
            setSelectedImage(item.images[0]);
        }
    }, [item]);

    const handleImageClick = (img: string): void => {
        setSelectedImage(img);
    };

    if (!item) return null;

    if (loadingSingle) {
        return <Loading />
    }

    const {
        name, description, category,
        color, price, discountPrice,
        isActive, currency, size,
        isAvailable
    } = item;

    return (
       <SingleItemBox>
           <Box>
               {selectedImage && (
                   <SelectedImageBox
                       src={selectedImage}
                       alt="Product img"
                   />
               )}
               <AllImagesBox>
                   {item?.images?.map((img, index) => (
                       <ImageItemBox
                           key={index}
                           src={img}
                           alt="Product img"
                           onClick={(): void => handleImageClick(img)}
                           selected={selectedImage === img}
                       />
                   ))}
               </AllImagesBox>
           </Box>
           <SingleItemInfoBox>
               <SingleItemTitle>{name}</SingleItemTitle>
               <SingleItemText>{description}</SingleItemText>
               <SingleItemDetailsBox>
                   <SingleItemDetails sx={{fontWeight: 700}}>Size:</SingleItemDetails>
                   <SingleItemDetails>{size}</SingleItemDetails>
               </SingleItemDetailsBox>
               <SingleItemDetailsBox>
                   <SingleItemDetails sx={{fontWeight: 700}}>Color:</SingleItemDetails>
                   <SingleItemDetails>{color}</SingleItemDetails>
               </SingleItemDetailsBox>
               <SingleItemCatBox>
                   <SingleItemCatName>{category.name}</SingleItemCatName>
               </SingleItemCatBox>
               <Box sx={{my: '26px'}}>
                   {discountPrice && (
                       <Typography color="error.main" fontSize="26px" fontWeight="bold">
                           {discountPrice} {currency}
                       </Typography>
                   )}
                   <Typography
                       sx={{
                           textDecoration: discountPrice ? 'line-through' : 'none',
                           color: 'text.secondary',
                           fontSize: discountPrice ? '16px' : '26px',
                       }}
                   >
                       {price} {currency}
                   </Typography>
               </Box>
               <Box>
                   <Typography color={isAvailable && isActive ? 'success.main' : 'error.main'}>
                       {isAvailable && isActive ? 'In stock' : 'Out of stock'}
                   </Typography>
               </Box>
               <AddBasketButton
                   color="primary"
                   variant="contained"
                   startIcon={<ShoppingCartIcon/>}
                   disabled={!(isAvailable && isActive)}
               >
                   Add to Basket
               </AddBasketButton>
           </SingleItemInfoBox>
       </SingleItemBox>
    );
}

export default SingleItemProduct;