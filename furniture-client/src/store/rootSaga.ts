import { all } from 'redux-saga/effects';

import { authUserSaga } from './slice/authUser/authUser.saga';


export default function* rootSaga() {
    yield all([authUserSaga()]);
}
