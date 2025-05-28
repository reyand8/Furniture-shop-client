import React, { useState } from 'react';
import {Box, Button, Typography} from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import noImg from '../../../../assets/img/noImg.png';
import { IProductItemAdminProps } from '../../../../types/props.interface';
import { OrderItemName } from '../../../../styles/Order.styles';
import { BasketItemAvatar, BasketItemPrice}  from '../../../../styles/Basket.styles';
import theme from '../../../../assets/theme';
import { ProductItemAdminPaper, ProductItemAdminSection } from '../../../../styles/Admin.styles';
import ProductEdit from "../product-edit";


const ProductItem: React.FC<IProductItemAdminProps> = ({item}) => {
    const {id, images, name, price, discountPrice, isActive, isAvailable, currency} = item;
    const [isProductEditOpen, setIsProductEditOpen] = useState(false);

    const handleProductEdit = (): void => {
        setIsProductEditOpen(true);
    };

    return (
            <ProductItemAdminSection>
                <ProductItemAdminPaper key={id} elevation={2}>
                    <BasketItemAvatar
                        variant="rounded"
                        src={images[0] || noImg}
                    />
                    <Box flex={1}>
                        <OrderItemName>
                            {name}
                        </OrderItemName>
                    </Box>
                    <BasketItemPrice>
                        { discountPrice ? `${discountPrice}` : `${price}` } {currency}
                    </BasketItemPrice>
                    <Box sx={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
                        <Typography variant="body1"
                                    sx={{color: theme.palette.text.secondary}}>
                            { isActive ? 'Active' : 'Not Active' }
                        </Typography>
                        <Typography variant="body1"
                                    sx={{color: theme.palette.text.secondary}}>
                            { isAvailable ? 'In stock' : 'Out of stock' }
                        </Typography>
                    </Box>
                    <Box>
                        <Button color="info" onClick={() => handleProductEdit()}>
                            <ModeEditIcon sx={{ fontSize: '21px' }} />
                        </Button>
                    </Box>
                </ProductItemAdminPaper>
                {isProductEditOpen && (
                    <ProductEdit
                        item={item}
                        isOpen={isProductEditOpen}
                        setIsOpen={setIsProductEditOpen}
                    />
                )}
            </ProductItemAdminSection>
    )
}

export default ProductItem;