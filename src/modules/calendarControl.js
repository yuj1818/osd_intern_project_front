import { createAction, handleActions } from "redux-actions";
import moment from 'moment';

const INCREASE_YEAR = 'calendarControl/INCREASE_YEAR';
const DECREASE_YEAR = 'calendarControl/DECREASE_YEAR';
const INCREASE_MONTH = 'calendarControl/INCREASE_MONTH';
const DECREASE_MONTH = 'calendarControl/DECREASE_MONTH';

export const increaseYear = createAction(INCREASE_YEAR);
export const decreaseYear = createAction(DECREASE_YEAR);
export const increaseMonth = createAction(INCREASE_MONTH);
export const decreaseMonth = createAction(DECREASE_MONTH);

const initialState = moment();

const calendarControl = handleActions(
    {
        [INCREASE_YEAR]: state => state.clone().add(1, 'year'),
        [DECREASE_YEAR]: state => state.clone().subtract(1, 'year'),
        [INCREASE_MONTH]: state => state.clone().add(1, 'month'),
        [DECREASE_MONTH]: state => state.clone().subtract(1, 'month')
    },
    initialState
);

export default calendarControl;