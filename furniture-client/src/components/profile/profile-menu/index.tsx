import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../../store/store';
import {
    IProfileMenuItems,
} from '../../../types/user.interface';
import { logout } from '../../../store/slice/authUser/authUser.slice';
import { ProfileMenuNavItem, ProfileMenuSection } from '../../../styles/Profile.styles';
import { profileMenuItems } from '../profile-menu-items';
import { PATHS } from '../../../routes/paths';


const ProfileMenu: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleMenuClick = (item: IProfileMenuItems): void => {
        const { path, label } = item;
        if (label === 'Logout') {
            dispatch(logout());
            navigate(PATHS.HOME);
        } else if (!!path) {
            navigate(path);
        }
    };

    return (
        <ProfileMenuSection>
            {profileMenuItems.map((item: IProfileMenuItems) => (
                <ProfileMenuNavItem
                    key={item.label}
                    onClick={(): void => handleMenuClick(item)}
                >
                    {item.icon}
                    {item.label}
                </ProfileMenuNavItem>
            ))}
        </ProfileMenuSection>
    )
}

export default ProfileMenu;