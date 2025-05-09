import { Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import Profile from '../pages/Profile';
import SignUp from '../pages/SignUp';


const AppRoutes = () => (
    <Routes>
        <Route index element={<Home />} />
        <Route path={'/profile'} element={<Profile />} />
        <Route path={'/signup'} element={<SignUp />} />
    </Routes>
);

export default AppRoutes;