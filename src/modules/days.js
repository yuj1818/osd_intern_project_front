import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../lib/createRequestSaga";
import * as dayAPI from '../lib/api';

const TOGGLE = 'days/TOGGLE';

const PICKED_CHECK = 'days/PICKED_CHECK';

const CHANGED_CHECK = 'days/CHANGED_CHECK';

const [SELECT_DAYS, SELECT_DAYS_SUCCESS, SELECT_DAYS_FAILURE] = createRequestActionTypes(
    'days/SELECT_DAYS'
);

const [CHANGE_DAYS, CHANGE_DAYS_SUCCESS, CHANGE_DAYS_FAILURE] = createRequestActionTypes(
    'days/CHANGE_DAYS'
);

const [GET_SELECTED_DAYS, GET_SELECTED_DAYS_SUCCESS, GET_SELECTED_DAYS_FAILURE] = createRequestActionTypes(
    'days/GET_SELECTED_DAYS'
);

const [GET_SELECTED_DAY, GET_SELECTED_DAY_SUCCESS, GET_SELECTED_DAY_FAILURE] = createRequestActionTypes(
    'days/GET_SELECTED_DAY'
);

export const toggle = createAction(TOGGLE, id => id);

export const pickedCheck = createAction(PICKED_CHECK, picked => picked);

export const changedCheck = createAction(CHANGED_CHECK, changed => changed);

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

export const getSelectedDays = createAction(GET_SELECTED_DAYS, ({t_index, m_num}) => ({
    t_index,
    m_num,
}));

export const getSelectedDay = createAction(GET_SELECTED_DAY, t_index => t_index);

const selectDaysSaga = createRequestSaga(SELECT_DAYS, dayAPI.selectDays);
const changeDaysSaga = createRequestSaga(CHANGE_DAYS, dayAPI.changeDays);
const getSelectedDaysSaga = createRequestSaga(GET_SELECTED_DAYS, dayAPI.getSelectedDays);
const getSelectedDaySaga = createRequestSaga(GET_SELECTED_DAY, dayAPI.getSelectedDay);

export function* daySaga() {
    yield takeLatest(SELECT_DAYS, selectDaysSaga);
    yield takeLatest(CHANGE_DAYS, changeDaysSaga);
    yield takeLatest(GET_SELECTED_DAYS, getSelectedDaysSaga);
    yield takeLatest(GET_SELECTED_DAY, getSelectedDaySaga);
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
    selectedDays: [],
    dayError: null,
    changed: false,
    selectedDay: null,
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
        [CHANGED_CHECK]: (state, { payload: changed }) => ({
            ...state,
            changed: changed,
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
            pickedMsg: null,
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
        [GET_SELECTED_DAYS_SUCCESS]: (state, { payload: selectedDays }) => ({
            ...state,
            days: state.days.map((day,idx) =>
                selectedDays[idx].checked === 1 ? {...day, checked: true} : {...day, checked: false}
            ),
            selectedDays: selectedDays,
        }),
        [GET_SELECTED_DAYS_FAILURE]: (state, { payload: error }) => ({
            ...state,
            dayError: error,
        }),
        [GET_SELECTED_DAY_SUCCESS]: (state, { payload: selectedDay }) => ({
            ...state,
            selectedDay,
        }),
        [GET_SELECTED_DAY_FAILURE]: (state, { payload: error }) => ({
            ...state,
            dayError: error,
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