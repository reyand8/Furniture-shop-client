import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../features/store';


const Profile: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect((): void => {
        const token: string | null = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/signup');
        } else {
            console.log("Profile")
        }
    }, [dispatch, navigate]);

    return (
        <>
        </>
    );
};


export default Profile;