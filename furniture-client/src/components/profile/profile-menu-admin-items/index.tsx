import PeopleIcon from '@mui/icons-material/People';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CategoryIcon from '@mui/icons-material/Category';
import LocalMallIcon from '@mui/icons-material/LocalMall';

import { IProfileMenuItems } from '../../../types/user.interface';
import { PATHS } from '../../../routes/paths';


const { ADMIN_USERS, ADMIN_CATEGORIES, ADMIN_PRODUCTS, ADMIN_ORDERS} = PATHS;

export const profileMenuAdminItems: IProfileMenuItems[] = [
    { label: 'Users', icon: <PeopleIcon sx={{ fontSize: 24 }} />, path: ADMIN_USERS },
    { label: 'Orders', icon: <LocalMallIcon sx={{ fontSize: 24 }} />, path: ADMIN_ORDERS },
    { label: 'Categories', icon: <CategoryIcon sx={{ fontSize: 24 }}/>, path: ADMIN_CATEGORIES },
    { label: 'Products', icon: <StorefrontIcon sx={{ fontSize: 24 }} />, path: ADMIN_PRODUCTS },
];
