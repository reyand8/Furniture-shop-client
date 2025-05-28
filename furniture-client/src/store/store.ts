import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import authUserReducer from './slice/authUser/authUser.slice';
import userReducer from './slice/user/user.slice';
import contactInfoReducer from './slice/contactInfo/contactInfo.slice';
import catalogReducer from './slice/catalog/catalog.slice';
import orderReducer from './slice/order/order.slice';
import adminReducer from './slice/admin/admin.slice';
import rootSaga from './rootSaga';


const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        authUser: authUserReducer,
        user: userReducer,
        contactInfo: contactInfoReducer,
        catalog: catalogReducer,
        order: orderReducer,
        admin: adminReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
