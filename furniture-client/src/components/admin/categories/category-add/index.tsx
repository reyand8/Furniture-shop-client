import React from 'react';

import AddFormWrapper from '../../../user-form/user-form-wrapper';
import CategoryCreate from '../category-create';


const CategoryAdd: React.FC = () => {
    return (
        <AddFormWrapper>
            <CategoryCreate />
        </AddFormWrapper>
    );
};

export default CategoryAdd;
