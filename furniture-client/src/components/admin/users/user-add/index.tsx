import React from 'react';

import { useSelector } from 'react-redux';
import { selectUser } from '../../../../store/slice/user/user.slice';
import UserCreate from '../user-create';
import AddFormWrapper from '../../../user-form/user-form-wrapper';


const UserAdd: React.FC = () => {
    const { user } = useSelector(selectUser);
    const isSuperAdmin: boolean = user?.role === 'SUPER_ADMIN';
    return (
        <AddFormWrapper disabled={!isSuperAdmin}>
            <UserCreate />
        </AddFormWrapper>
    );
};

export default UserAdd;
