import { all } from 'redux-saga/effects';

import { authUserSaga } from './slice/authUser/authUser.saga';
import { userSaga } from './slice/user/user.saga';
import { contactInfoSaga } from './slice/contactInfo/contactInfo.saga';
import { catalogSaga } from './slice/catalog/catalog.saga';


export default function* rootSaga() {
    yield all([
        authUserSaga(),
        userSaga(),
        contactInfoSaga(),
        catalogSaga(),
    ]);
}
