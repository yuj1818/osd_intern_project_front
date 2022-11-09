import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../lib/createRequestSaga";
import * as dayAPI from '../lib/api';

const TOGGLE = 'days/TOGGLE';

const PICKED_CHECK = 'days/PICKED_CHECK';

const [SELECT_DAYS, SELECT_DAYS_SUCCESS, SELECT_DAYS_FAILURE] = createRequestActionTypes(
    'days/SELECT_DAYS'
);

const [CHANGE_DAYS, CHANGE_DAYS_SUCCESS, CHANGE_DAYS_FAILURE] = createRequestActionTypes(
    'days/CHANGE_DAYS'
);

export const toggle = createAction(TOGGLE, id => id);

export const pickedCheck = createAction(PICKED_CHECK, picked => picked);

export const selectDays = createAction(SELECT_DAYS, ({t_index, m_num, days}) => ({
    t_index,
    m_num,
    days
}));

export const changeDays = createAction(CHANGE_DAYS, ({t_index, m_num, days}) => ({
    t_index,
    m_num,
    days
}));

const selectDaysSaga = createRequestSaga(SELECT_DAYS, dayAPI.selectDays);
const changeDaysSaga = createRequestSaga(CHANGE_DAYS, dayAPI.changeDays);

export function* daySaga() {
    yield takeLatest(SELECT_DAYS, selectDaysSaga);
    yield takeLatest(CHANGE_DAYS, changeDaysSaga);
};

const initialState = {
    days: [
        {
            id: 1,
            text: "월요일",
            checked: true,
        },
        {
            id: 2,
            text: "화요일",
            checked: true,
        },
        {
            id: 3,
            text: "수요일",
            checked: true,
        },
        {
            id: 4,
            text: "목요일",
            checked: true,
        },
        {
            id: 5,
            text: "금요일",
            checked: true,
        }
    ],
    pickedMsg: null,
    picked: false,
    dayError: null,
};

const days = handleActions(
    {
        [TOGGLE]: (state, { payload: id }) => ({
            ...state,
            days: state.days.map(day =>
                day.id === id ? { ...day, checked: !day.checked } : day
            )
        }),
        [PICKED_CHECK]: (state, { payload: picked }) => ({
            ...state,
            picked: picked,
        }),
        [SELECT_DAYS]: state => ({
            ...state,
            pickedMsg: null,
            dayError: null,
        }),
        [SELECT_DAYS_SUCCESS]: (state, { payload: pickedMsg }) => ({
            ...state,
            pickedMsg,
        }),
        [SELECT_DAYS_FAILURE]: (state, { payload: error }) => ({
            ...state,
            dayError: error,
        }),
        [CHANGE_DAYS]: state => ({
            ...state,
            pickedDay: null,
            dayError: null,
        }),
        [CHANGE_DAYS_SUCCESS]: (state, { payload: pickedMsg }) => ({
            ...state,
            pickedMsg
        }),
        [CHANGE_DAYS_FAILURE]: (state, { payload: error }) => ({
            ...state,
            dayError: error
        }),
    },
    initialState
)

// function days(state = initialState, action) {
//     switch (action.type) {
//         case TOGGLE:
//             return {
//                 ...state,
//                 days: state.days.map(day =>
//                     day.id === action.id ? { ...day, checked: !day.checked } : day
//                 )
//             };
//         default:
//             return state;
//     }
// }

export default days;