import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { profileMenuItems } from '../profile-menu-items';
import { AppDispatch } from '../../../store/store';
import {
    IProfileMenuItems,
    IProfileMenuProps,
    ProfileSection
} from '../../../types/user.interface';
import { logout } from '../../../store/slice/authUser/authUser.slice';
import { ProfileMenuNavItem, ProfileMenuSection } from '../../../styles/Profile.styles';


const ProfileMenu: React.FC<IProfileMenuProps> = ({setSelectedSection}) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleMenuClick = (label: string): void => {
        if (label === 'Logout') {
            dispatch(logout());
            navigate('/');
        } else {
            setSelectedSection(label as ProfileSection);
        }
    };

    return (
        <ProfileMenuSection>
            {profileMenuItems.map((item: IProfileMenuItems) => (
                <ProfileMenuNavItem
                    key={item.label}
                    component={Link}
                    onClick={(e): void => {
                        e.preventDefault();
                        handleMenuClick(item.label);
                    }}
                    disableRipple
                >
                    {item.icon}
                    {item.label}
                </ProfileMenuNavItem>
            ))}
        </ProfileMenuSection>
    )
}

export default ProfileMenu;