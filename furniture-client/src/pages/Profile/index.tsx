import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ProfileBox, ProfileData, ProfileMainDataBox } from '../../styles/Profile.styles';
import Header from '../../components/header';
import ProfileMenu from '../../components/profile/profile-menu';
import ProfileInfo from '../../components/profile/profile-info';
import LoadingInfo  from '../../components/status/loading';
import ErrorInfo from '../../components/status/error';
import Footer from '../../components/footer';
import { AppDispatch } from '../../store/store';
import {
    clearProfileError, fetchProfileRequest,
    selectUser
} from '../../store/slice/user/user.slice';
import { logout } from '../../store/slice/authUser/authUser.slice';
import { ProfileSection } from '../../types/user.interface';
import { PATHS } from '../../routes/paths';


const Profile: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [selectedSection, setSelectedSection] = useState<ProfileSection>('Profile');
    const { user, loading, error } = useSelector(selectUser);
    const token: string | null = localStorage.getItem('accessToken');

    const isLoading: boolean = !error && loading;
    const isLoaded: boolean = !error && !loading;

    useEffect((): void => {
        if (!token && !error) {
            navigate(PATHS.LOGIN);
            return;
        }
        if (!loading && !user && !error) {
            dispatch(fetchProfileRequest());
        }
    }, [dispatch, navigate, token, error, loading, user]);

    useEffect(() => {
        if (error) {
            const timer = setTimeout((): void => {
                dispatch(logout());
                dispatch(clearProfileError());
            }, 2000);
            return (): void => clearTimeout(timer);
        }
    }, [error, dispatch]);

    const sectionComponents: Record<ProfileSection, React.ReactNode> =
        useMemo(() => ({
            'Profile': <ProfileInfo user={user} />,
            'Contact Info': <div>Contact info</div>,
            'Orders': <div>Orders Content</div>,
        }), [user]);

    return (
        <>
            <ProfileBox>
                <Header />
                <ProfileMainDataBox>
                    <ProfileMenu setSelectedSection={setSelectedSection} />
                    <ProfileData>
                        { error && <ErrorInfo /> }
                        { isLoading && <LoadingInfo /> }
                        { isLoaded && sectionComponents[selectedSection] }
                    </ProfileData>
                </ProfileMainDataBox>
            </ProfileBox>
            <Footer />
        </>
    );
};

export default Profile;