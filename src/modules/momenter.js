import moment from 'moment';
import * as api from '../lib/api'

/* 액션 타입 만들기 */
const MONTH_INCREASE = 'momenter/MONTH_INCREASE';
const MONTH_DECREASE = 'momenter/MONTH_DECREASE';
const YEAR_INCREASE = 'momenter/YEAR_INCREASE';
const YEAR_DECREASE = 'momenter/YEAR_DECREASE';

const CHANGE_TITLE = 'momenter/CHANGE_TITLE';
const CHANGE_CATEGORY = 'momenter/CHANGE_CATEGORY';
const CHANGE_STARTDATE = 'momenter/CHANGE_STARTDATE';
const CHANGE_ENDDATE = 'momenter/CHANGE_ENDDATE';
const SET_NULL = 'momenter/SET_NULL';

const GET_HOLIDAY = 'momenter/GET_HOLIDAY';
const GET_HOLIDAY_SUCCESS = 'momenter/GET_HOLIDAY_SUCCESS';
const GET_HOLIDAY_FAILURE = 'momenter/GET_HOLIDAY_FAILURE';

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.
export const yearIncrease = () => ({ type: YEAR_INCREASE });
export const yearDecrease = () => ({ type: YEAR_DECREASE });
export const monthIncrease = () => ({ type : MONTH_INCREASE });
export const monthDecrease = () => ({ type : MONTH_DECREASE });

export const changeTitle = eventTitle => ({ type : CHANGE_TITLE, eventTitle});
export const changeCategory = category => ({ type : CHANGE_CATEGORY, category});
export const changeStartDate = date => ({ type : CHANGE_STARTDATE, date});
export const changeEndDate = date => ({ type : CHANGE_ENDDATE, date});
export const setNull = () => ({ type : SET_NULL});

/* 초기 상태 선언 */
const initialState = {
    momentValue: moment(),
    holiday: null,
    loading: {
        GET_HOLIDAY: false
    },
    newEventInfo : {
        title : '',
        category : '',
        startDate : '',
        endDate : ''
    },
};

export const getHoliday = momentValue => async dispatch => {
    dispatch({ type: GET_HOLIDAY });
    try {
        const response = await api.getHoliday(momentValue.format('YYYY'),momentValue.format('MM')); // API 호출
        const item = response.data.response.body.items.item;
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


/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
export default function momenter(state = initialState, action) {
    switch (action.type) {
        case YEAR_INCREASE:
            return {
                ...state,
                momentValue: state.momentValue.clone().add(1,'year')
            };
        case YEAR_DECREASE:
            return {
                ...state,
                momentValue: state.momentValue.clone().subtract(1,'year')
            };
        case MONTH_INCREASE:
            return {
                ...state,
                momentValue: state.momentValue.clone().add(1,'month')
            }
        case MONTH_DECREASE:
            return {
                ...state,
                momentValue: state.momentValue.clone().subtract(1,'month')
            }

        case CHANGE_TITLE :
            return {
                ...state,
                newEventInfo: {
                    ...state.newEventInfo,
                    title: action.eventTitle
                }
            }
        case CHANGE_CATEGORY :
            return {
                ...state,
                newEventInfo: {
                    ...state.newEventInfo,
                    category: action.category
                }
            }
        case CHANGE_STARTDATE :
            return {
                ...state,
                newEventInfo: {
                    ...state.newEventInfo,
                    startDate: action.date
                }
            }
        case CHANGE_ENDDATE :
            return {
                ...state,
                newEventInfo: {
                    ...state.newEventInfo,
                    endDate: action.date
                }
            }
        case SET_NULL :
            return {
                ...state,
                newEventInfo: initialState.newEventInfo
            }

        case GET_HOLIDAY :
            return {
                ... state,
                loading: {
                    ...state.loading,
                    GET_HOLIDAY: true
                }
            }
        case GET_HOLIDAY_SUCCESS :
            return {
                ...state,
                loading: {
                    ...state.loading,
                    GET_HOLIDAY: false

                },
                holiday: action.payload

            }
        case GET_HOLIDAY_FAILURE :
            return {
                ...state,
                loading: {
                    ...state.loading,
                    GET_HOLIDAY: false
                }
            }

        default:
            return state;
    }
}