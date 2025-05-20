import PersonIcon from '@mui/icons-material/Person';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import LogoutIcon from '@mui/icons-material/Logout';

import { IProfileMenuItems } from '../../../types/user.interface';
import { PATHS } from '../../../routes/paths';

const { PROFILE, PROFILE_CONTACT_INFO, PROFILE_ORDERS } = PATHS;


export const profileMenuItems: IProfileMenuItems[] = [
    { label: 'Profile', icon: <PersonIcon sx={{ fontSize: 24 }} />, path: PROFILE },
    { label: 'Contact Info', icon: <LocalShippingIcon sx={{ fontSize: 24 }}/>, path: PROFILE_CONTACT_INFO },
    { label: 'Orders', icon: <LocalMallIcon sx={{ fontSize: 24 }} />, path: PROFILE_ORDERS },
    { label: 'Logout', icon: <LogoutIcon sx={{ fontSize: 24 }} /> },
];
