import { Route, Routes } from 'react-router-dom';

import { PATHS } from './paths';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import ProfileInfo from '../components/profile/profile-info';
import ContactInfo from '../components/contact-info';
import Contact from '../pages/Contact';
import About from '../pages/About';
import SingleProduct from '../pages/SingleProduct';
import NotFound from '../pages/NotFound';
import Catalog from '../pages/Catalog';
import Basket from '../pages/Basket';
import CreateOrder from '../pages/CreateOrder';


const {
    PROFILE, SIGN_UP, LOGIN, CATALOG,
    CONTACT_INFO, ORDERS, ABOUT, BASKET,
    CONTACT, SINGLE_PRODUCT, UNEXPECTED_PATHS,
    CREATE_ORDER
} = PATHS;

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
        <Route path={ABOUT} element={<About />} />
        <Route path={CONTACT} element={<Contact />} />
        <Route path={CATALOG} element={<Catalog />} />
        <Route path={BASKET} element={<Basket />} />
        <Route path={CREATE_ORDER} element={<CreateOrder />} />
        <Route path={SINGLE_PRODUCT} element={<SingleProduct />} />
        <Route path={UNEXPECTED_PATHS} element={<NotFound />} />
    </Routes>
);

export default AppRoutes;