import { createAction, handleActions } from "redux-actions";
import moment from 'moment';
import * as api from '../lib/api';

const INCREASE_YEAR = 'momenter/INCREASE_YEAR';
const DECREASE_YEAR = 'momenter/DECREASE_YEAR';
const INCREASE_MONTH = 'momenter/INCREASE_MONTH';
const DECREASE_MONTH = 'momenter/DECREASE_MONTH';

const GET_HOLIDAY = 'momenter/GET_HOLIDAY';
const GET_HOLIDAY_SUCCESS = 'momenter/GET_HOLIDAY_SUCCESS';
const GET_HOLIDAY_FAILURE = 'momenter/GET_HOLIDAY_FAILURE';

export const increaseYear = createAction(INCREASE_YEAR);
export const decreaseYear = createAction(DECREASE_YEAR);
export const increaseMonth = createAction(INCREASE_MONTH);
export const decreaseMonth = createAction(DECREASE_MONTH);

export const getHoliday = (solYear, solMonth) => async dispatch => {
    dispatch({ type: GET_HOLIDAY });
    try {
        const response = await api.getHoliday(solYear,solMonth);
        const item = response.data.response.body.items.item;
        console.log(item)
        dispatch({
            type: GET_HOLIDAY_SUCCESS,
            payload: item ? item.length? item : [item] : null
        });
    } catch (e) {
        dispatch({
            type: GET_HOLIDAY_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
};

const initialState = {
    loading: {
        GET_HOLIDAY: false
    },
    holiday: null,
    today: moment()
}

const momenter = handleActions(
    {
        [INCREASE_YEAR]: state => ({
            ...state,
            today: state.today.clone().add(1, 'year')
        }),
        [DECREASE_YEAR]: state => ({
            ...state,
            today: state.today.clone().subtract(1, 'year')
        }),
        [INCREASE_MONTH]: state => ({
            ...state,
            today: state.today.clone().add(1, 'month')
        }),
        [DECREASE_MONTH]: state => ({
            ...state,
            today: state.today.clone().subtract(1, 'month')
        }),
        [GET_HOLIDAY]: state => ({
            ...state,
            loading: {
                ...state.loading,
                GET_HOLIDAY: true
            }
        }),
        [GET_HOLIDAY_SUCCESS]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                GET_HOLIDAY: false
            },
            holiday: action.payload
        }),
        [GET_HOLIDAY_FAILURE]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                GET_HOLIDAY: false
            }
        })
    },
    initialState
);

export default momenter;