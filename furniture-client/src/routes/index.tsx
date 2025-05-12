import { Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import Profile from '../pages/Profile';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';


const AppRoutes = () => (
    <Routes>
        <Route index element={<Home />} />
        <Route path={'/profile'} element={<Profile />} />
        <Route path={'/signup'} element={<SignUp />} />
        <Route path={'/login'} element={<SignIn />} />
    </Routes>
);

export default AppRoutes;