import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../lib/createRequestSaga";
import * as authAPI from '../lib/api';


const idType = /^[a-zA-Z0-9]{4,}$/;
const pwdType = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/;

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auto/INITIALIZE_FORM';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
    'auth/REGISTER',
);

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
    'auth/LOGIN',
);

export const changeField = createAction(
    CHANGE_FIELD,
    ({ form, key, value }) => ({
        form,
        key,
        value,
    }),
);
export const initializeForm = createAction(INITIALIZE_FORM, form => form);

export const register = createAction(REGISTER, ({ m_id, m_password, m_name, m_dept }) => ({
    m_id,
    m_password,
    m_name,
    m_dept,
}));

export const login = createAction(LOGIN, ({ m_id, m_password }) => ({
    m_id,
    m_password,
}));

const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
export function* authSaga() {
    yield takeLatest(REGISTER, registerSaga);
    yield takeLatest(LOGIN, loginSaga);
};

const initialState = {
    register: {
        m_id: '',
        m_name: '',
        m_dept: 1,
        m_password: '',
        passwordConfirm: '',
        id_err: '',
        pw_err: '',
    },
    login: {
        m_id: '',
        m_password: '',
    },
};

const auth = handleActions(
    {
        [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
            produce(state, draft => {
                if(form == 'register' && key == 'm_id') {
                    if(!idType.test(value)) {
                        draft[form]['id_err'] = '4자리 이상 영어 또는 숫자만 입력해주세요';
                    } else {
                        draft[form]['id_err'] = '사용가능한 아이디입니다';
                    }
                } else if(form == 'register' && key== 'm_password') {
                    if(!pwdType.test(value)) {
                        draft[form]['pw_err'] = '숫자, 영어, 특수문자 모두 하나 이상씩 조합하여 8자리 이상 입력해주세요';
                    } else {
                        draft[form]['pw_err'] = '사용가능한 비밀번호 입니다';
                    }
                }
                draft[form][key] = value;
            }),
        [INITIALIZE_FORM]: (state, { payload: form }) => ({
            ...state,
            [form]: initialState[form],
        }),
        [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
            ...state,
            authError: null,
            auth,
        }),
        [REGISTER_FAILURE]: (state, { payload: error }) => ({
            ...state,
            authError: error,
        }),
        [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
            ...state,
            authError: null,
            auth,
        }),
        [LOGIN_FAILURE]: (state, { payload: error }) => ({
            ...state,
            authError: error,
        }),
    },
    initialState,
);

export default auth;