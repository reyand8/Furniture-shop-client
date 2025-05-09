import { all } from 'redux-saga/effects';

import { userSaga } from './slice/user/userSaga';


export default function* rootSaga() {
    yield all([userSaga()]);
}
