import { Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import Profile from '../pages/Profile';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import { PATHS } from './paths';
import ProfileInfo from "../components/profile/profile-info";
import ContactInfo from "../components/contact-info";


const { PROFILE, SIGN_UP, LOGIN, CONTACT_INFO, ORDERS } = PATHS;

const AppRoutes = () => (
    <Routes>
        <Route index element={<Home />} />
        <Route path={PROFILE} element={<Profile />}>
            <Route index element={<ProfileInfo />} />
            <Route path={CONTACT_INFO} element={<ContactInfo />} />
            <Route path={ORDERS} element={<div>Orders Content</div>} />
        </Route>
        <Route path={SIGN_UP} element={<SignUp />} />
        <Route path={LOGIN} element={<SignIn />} />
    </Routes>
);

export default AppRoutes;