import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { Typography } from '@mui/material';

import { AppDispatch } from '../../../store/store';
import { IProfileMenuItems } from '../../../types/user.interface';
import { logout } from '../../../store/slice/authUser/authUser.slice';
import { AdminMenuSection, ProfileMenuNavItem, ProfileMenuSection } from '../../../styles/Profile.styles';
import { profileMenuItems } from '../profile-menu-items';
import { PATHS } from '../../../routes/paths';
import { finishSession, selectUser } from '../../../store/slice/user/user.slice';
import { profileMenuAdminItems }  from '../profile-menu-admin-items';


const ProfileMenu: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();

    const { user } = useSelector(selectUser);

    const isAdmin: boolean = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';

    const handleMenuClick = (item: IProfileMenuItems): void => {
        const { path, label } = item;
        if (label === 'Logout') {
            dispatch(logout());
            dispatch(finishSession());
            navigate(PATHS.HOME);
        } else if (!!path) {
            navigate(path);
        }
    };

    return (
        <ProfileMenuSection>
            {profileMenuItems.map((item: IProfileMenuItems) => {
                const isActive: boolean = location.pathname === item.path;
                return (
                    <ProfileMenuNavItem
                        key={item.label}
                        onClick={(): void => handleMenuClick(item)}
                        isActive={isActive}
                    >
                        {item.icon}
                        {item.label}
                    </ProfileMenuNavItem>
                );
            })}
            {isAdmin && (
                <AdminMenuSection>
                    <Typography variant="h6">You are logged in as Admin</Typography>
                    {profileMenuAdminItems.map((item: IProfileMenuItems) => {
                        const isActive: boolean = location.pathname === item.path;
                        return (
                            <ProfileMenuNavItem
                                key={item.label}
                                onClick={() => handleMenuClick(item)}
                                isActive={isActive}
                            >
                                {item.icon}
                                {item.label}
                            </ProfileMenuNavItem>
                        );
                    })}
                </AdminMenuSection>
            )}
        </ProfileMenuSection>
    );
};

export default ProfileMenu;
