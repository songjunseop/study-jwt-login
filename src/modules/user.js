import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import createRequestSaga, {
    createRequestActionTypes,
} from '../lib/createRequestSaga';
const LOGOUT = 'auth/LOGOUT';

const TEMP_SET_USER = 'auth/TEMP_SET_USER';
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
    'auth/CHECK',
);

export const tempSetUser = createAction(TEMP_SET_USER, auth => auth);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);

const checkSaga = createRequestSaga(CHECK, authAPI.check);

function checkFailureSaga() {
    try {
        localStorage.removeItem('auth');
        console.log('checkFailure')
    } catch (e) {
        console.log('localStorage is not working')
    }
}

function* logoutSaga() {
    try {
        yield call(authAPI.logout);
        // localStorage.removeItem('auth');
        console.log('logout')
    } catch (e) {
        console.log(e);
    }
}

export function* userSaga() {
    yield takeLatest(CHECK, checkSaga);
    yield takeLatest(CHECK_FAILURE, checkFailureSaga);
    yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
    auth: null,
    checkError: null,
};

export default handleActions(
    {
        [TEMP_SET_USER]: (state, { payload: auth }) => ({
            ...state,
            auth,
        }),
        [CHECK_SUCCESS]: (state, { payload: auth }) => ({
            ...state,
            auth,
            checkError: null,
        }),
        [CHECK_FAILURE]: (state, { payload: error }) => ({
            ...state,
            auth: null,
            checkError: error,
        }),
        [LOGOUT]: state => ({
            ...state,
            auth: null,
        }),
    },
    initialState,
);

