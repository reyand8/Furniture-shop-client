import PersonIcon from '@mui/icons-material/Person';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import LogoutIcon from '@mui/icons-material/Logout';

import { IProfileMenuItems } from '../../../types/user.interface';

export const profileMenuItems: IProfileMenuItems[] = [
    { label: 'Profile', icon: <PersonIcon sx={{ fontSize: 24 }} /> },
    { label: 'Contact Info', icon: <LocalShippingIcon sx={{ fontSize: 24 }} /> },
    { label: 'Orders', icon: <LocalMallIcon sx={{ fontSize: 24 }} /> },
    { label: 'Logout', icon: <LogoutIcon sx={{ fontSize: 24 }} /> },
];
