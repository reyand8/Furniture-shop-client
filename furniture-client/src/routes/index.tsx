import { Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import Profile from '../pages/Profile';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import { PATHS } from './paths';


const AppRoutes = () => (
    <Routes>
        <Route index element={<Home />} />
        <Route path={PATHS.PROFILE} element={<Profile />} />
        <Route path={PATHS.SIGN_UP} element={<SignUp />} />
        <Route path={PATHS.LOGIN} element={<SignIn />} />
    </Routes>
);

export default AppRoutes;