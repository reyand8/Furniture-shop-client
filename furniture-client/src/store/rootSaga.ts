import { all } from 'redux-saga/effects';

import { authUserSaga } from './slice/authUser/authUserSaga';


export default function* rootSaga() {
    yield all([authUserSaga()]);
}
