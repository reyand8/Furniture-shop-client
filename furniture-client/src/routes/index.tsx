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
import CreateOrder from '../pages/OrderCreate';
import OrderList from '../components/order/order-list';
import Users from '../components/admin/users';
import Categories from '../components/admin/categories';
import Products from '../components/admin/products';
import Orders from '../components/admin/orders';


const {
    PROFILE, SIGN_UP, LOGIN, CATALOG,
    CONTACT_INFO, ORDERS, ABOUT, BASKET,
    CONTACT, SINGLE_PRODUCT, UNEXPECTED_PATHS,
    CREATE_ORDER, ADMIN_USERS, ADMIN_CATEGORIES,
    ADMIN_PRODUCTS, ADMIN_ORDERS
} = PATHS;

const AppRoutes = () => (
    <Routes>
        <Route index element={<Home />} />
        <Route path={PROFILE} element={<Profile />}>
            <Route index element={<ProfileInfo />} />
            <Route path={CONTACT_INFO} element={<ContactInfo />} />
            <Route path={ORDERS} element={<OrderList />} />

            <Route path={ADMIN_USERS} element={<Users />} />
            <Route path={ADMIN_CATEGORIES} element={<Categories />} />
            <Route path={ADMIN_PRODUCTS} element={<Products />} />
            <Route path={ADMIN_ORDERS} element={<Orders />} />

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