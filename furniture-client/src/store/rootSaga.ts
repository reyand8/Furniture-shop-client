import { all } from 'redux-saga/effects';

import { authUserSaga } from './slice/authUser/authUser.saga';
import { userSaga } from './slice/user/user.saga';


export default function* rootSaga() {
    yield all([
        authUserSaga(),
        userSaga(),
    ]);
}
