import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import userReducer from './slice/authUser/authUserSlice';
import rootSaga from './rootSaga';


const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        authUser: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
