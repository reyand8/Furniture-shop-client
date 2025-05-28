import React from 'react';

import AddFormWrapper from '../../../user-form/user-form-wrapper';
import ProductCreate from '../product-create';


const ProductAdd: React.FC = () => {
    return (
        <AddFormWrapper>
            <ProductCreate />
        </AddFormWrapper>
    );
};

export default ProductAdd;
