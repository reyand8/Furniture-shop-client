import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Box, Button, Typography } from '@mui/material';

import { AppDispatch } from '../../../store/store';
import theme from '../../../assets/theme';
import {
    fetchCategoriesRequest,
    selectCatalog
} from '../../../store/slice/catalog/catalog.slice';
import CategoryEdit from './category-edit';
import { ICategory } from '../../../types/catalog.interface';
import Empty from '../../status/empty';
import CategoryAdd from './category-add';
import {
    AllCategoriesBox,
    AllCategoriesSection,
    CategoryItemAdminText,
    CategoryListAdminSection
} from '../../../styles/Admin.styles';
import Loading from '../../status/loading';
import ErrorInfo from '../../status/error';


const Categories: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { categories, loadingCategories, errorCategories } = useSelector(selectCatalog);

    const [isCategoryEditOpen, setIsCategoryEditOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);

    useEffect((): void => {
        dispatch(fetchCategoriesRequest());
    }, [dispatch]);

    const handleCategoryEdit = (category: ICategory): void => {
        setSelectedCategory(category);
        setIsCategoryEditOpen(true);
    };

    const activeCategories: ICategory[] = categories.filter(category => category.isActive);
    const inactiveCategories: ICategory[] = categories.filter(category => !category.isActive);

    if (loadingCategories) return <Loading />;
    if (errorCategories) return <ErrorInfo />;

    return (
        <AllCategoriesSection>
            <Typography variant="h5" sx={{color: theme.palette.text.secondary}}>
                Categories
            </Typography>
            <Box sx={{my: 3, maxWidth: '400px', width: '100%'}}>
                <CategoryAdd />
            </Box>
            <AllCategoriesBox>
                {activeCategories.length > 0 ? (
                    activeCategories.map((category) => (
                        <CategoryListAdminSection key={category.id}>
                            <CategoryItemAdminText>
                                {category.name}
                            </CategoryItemAdminText>
                            <Box>
                                <Button color="info" onClick={() => handleCategoryEdit(category)}>
                                    <ModeEditIcon sx={{ fontSize: '21px' }} />
                                </Button>
                            </Box>
                        </CategoryListAdminSection>
                    ))
                ) : (
                    <Empty/>
                )}
                {inactiveCategories.length > 0 && (
                    <>
                        <Typography variant="subtitle2" sx={{ mt: 4, color: theme.palette.text.disabled }}>
                            Inactive Categories
                        </Typography>
                        {inactiveCategories.map(category => (
                            <CategoryListAdminSection key={category.id}>
                                <CategoryItemAdminText sx={{color: theme.palette.text.disabled }}>
                                    {category.name}
                                </CategoryItemAdminText>
                                <Box>
                                    <Button color="info" onClick={() => handleCategoryEdit(category)}>
                                        <ModeEditIcon sx={{ fontSize: '21px' }} />
                                    </Button>
                                </Box>
                            </CategoryListAdminSection>
                        ))}
                    </>
                )}
                { selectedCategory && (
                    <CategoryEdit
                        item={selectedCategory}
                        isOpen={isCategoryEditOpen}
                        setIsOpen={setIsCategoryEditOpen}
                    />
                )}
            </AllCategoriesBox>
        </AllCategoriesSection>
    );
};

export default Categories;