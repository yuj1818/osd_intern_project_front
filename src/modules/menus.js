import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../lib/createRequestSaga";
import * as menuAPI from '../lib/api';

const INITIALIZE = 'menus/INITIALIZE'

const CHANGE_INPUT = 'menus/CHANGE_INPUT';
// const INSERT = 'menus/INSERT';
//const MENU_LIKE = 'menus/MENU_LIKE';

const SUGGEST_CHECK = 'menus/SUGGEST_CHECK';

const LIKE_CHECK = 'menus/LIKE_CHECK';

const EMPTY_CHECK = 'menus/EMPTY_CHECK';

const [GET_MENUS, GET_MENUS_SUCCESS, GET_MENUS_FAILURE] = createRequestActionTypes(
    'menus/GET_MENUS'
);

const [SUGGEST_MENU, SUGGEST_MENU_SUCCESS, SUGGEST_MENUS_FAILURE] = createRequestActionTypes(
    'menus/SUGGEST_MENU'
);

const [LIKE_MENU, LIKE_MENU_SUCCESS, LIKE_MENU_FAILURE] = createRequestActionTypes(
    'menus/LIKE_MENU'
);

const [GET_LIKE, GET_LIKE_SUCCESS, GET_LIKE_FAILURE] = createRequestActionTypes(
    'menus/GET_LIKE'
);

const [GET_SELECTED_MENU, GET_SELECTED_MENU_SUCCESS, GET_SELECTED_MENU_FAILURE] = createRequestActionTypes(
    'menus/GET_SELECTED_MENU'
);

export const getMenus = createAction(GET_MENUS, t_index => t_index);

export const suggestMenu = createAction(SUGGEST_MENU, ({tIndex, mNum, fName}) => ({
    tIndex,
    mNum,
    fName
}));

export const likeMenu = createAction(LIKE_MENU, ({tIndex, mNum, fName}) => ({
    tIndex,
    mNum,
    fName
}));

export const getLike = createAction(GET_LIKE, ({tIndex, mNum}) => ({
    tIndex,
    mNum
}));

export const changeInput = createAction(CHANGE_INPUT, input => input);

export const initialize = createAction(INITIALIZE, input => input);

export const suggestCheck = createAction(SUGGEST_CHECK, suggested => suggested)

export const likeCheck = createAction(LIKE_CHECK, like => like)

export const emptyCheck = createAction(EMPTY_CHECK, checkEmpty => checkEmpty)

export const getSelectedMenu = createAction(GET_SELECTED_MENU, t_index => t_index);

const getMenusSaga = createRequestSaga(GET_MENUS, menuAPI.getMenus);
const suggestMenuSaga = createRequestSaga(SUGGEST_MENU, menuAPI.suggestMenu);
const likeMenuSaga = createRequestSaga(LIKE_MENU, menuAPI.likeMenu);
const getLikeSaga = createRequestSaga(GET_LIKE, menuAPI.getLike);
const selectedMenuSaga = createRequestSaga(GET_SELECTED_MENU, menuAPI.getSelectedMenu);

export function* menuSaga() {
    yield takeLatest(SUGGEST_MENU, suggestMenuSaga);
    yield takeLatest(GET_MENUS, getMenusSaga);
    yield takeLatest(LIKE_MENU, likeMenuSaga);
    yield takeLatest(GET_LIKE, getLikeSaga);
    yield takeLatest(GET_SELECTED_MENU, selectedMenuSaga);
}

const initialState = {
    input: '',
    like: null,
    menuError: null,
    menus: [],
    menu: null,
    suggested: false,
    pick: null,
    likeError: null,
    liked: false,
    selectedMenu: [],
    checkEmpty: false,
};

const menus = handleActions(
    {
        [INITIALIZE]: state => initialState,
        [CHANGE_INPUT]: (state, { payload: input }) => ({
            ...state,
            input: input,
        }),
        [SUGGEST_CHECK]: (state, { payload: suggested }) => ({
            ...state,
            suggested: suggested,
        }),
        [EMPTY_CHECK]: (state, { payload: checkEmpty }) => ({
            ...state,
            checkEmpty: checkEmpty,
        }),
        [LIKE_CHECK]: (state, { payload: liked }) => ({
            ...state,
            liked: liked,
        }),
        [GET_MENUS_SUCCESS]: (state, { payload: menus }) => ({
            ...state,
            menus: menus
        }),
        [GET_MENUS_FAILURE]: (state, { payload: error }) => ({
            ...state,
            menus: null,
            menuError: error,
        }),
        [SUGGEST_MENU]: state => ({
            ...state,
            menu: null,
            menuError: null,
        }),
        [SUGGEST_MENU_SUCCESS]: (state, { payload: menu }) => ({
            ...state,
            menu
        }),
        [SUGGEST_MENUS_FAILURE]: (state, { payload: menuError }) => ({
            ...state,
            menuError,
        }),
        [LIKE_MENU]: state => ({
            ...state,
            pick: null,
            likeError: null,
        }),
        [LIKE_MENU_SUCCESS]: (state, { payload: pick }) => ({
            ...state,
            pick,
        }),
        [LIKE_MENU_FAILURE]: (state, { payload: error }) => ({
            ...state,
            likeError: error,
        }),
        [GET_LIKE_SUCCESS]: (state, { payload: like }) => ({
            ...state,
            like: like[0].f_name,
        }),
        [GET_LIKE_FAILURE]: (state, { payload: error }) => ({
            ...state,
            like: null,
            likeError: error,
        }),
        [GET_SELECTED_MENU_SUCCESS]: (state, { payload: selectedMenu }) => ({
            ...state,
            selectedMenu: selectedMenu,
        }),
        [GET_SELECTED_MENU_FAILURE]: (state, { payload: error }) => ({
            ...state,
            selectedMenu: null,
            menuError: error,
        }),
    },
    initialState
)

// function menus(state = initialState, action) {
//     switch (action.type) {
//         case CHANGE_INPUT:
//             return {
//                 ...state,
//                 input: action.input
//             };
//         case INSERT:
//             return {
//                 ...state,
//                 text: action.text
//             };
//         case MENU_LIKE:
//             return {
//                 ...state,
//                 like: !state.like
//             }
//         default:
//             return state;
//     }
// }

export default menus;