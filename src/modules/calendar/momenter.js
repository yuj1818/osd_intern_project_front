import moment from 'moment';
import * as api from '../../lib/api'

/* 액션 타입 만들기 */
const MONTH_INCREASE = 'momenter/MONTH_INCREASE';
const MONTH_DECREASE = 'momenter/MONTH_DECREASE';
const YEAR_INCREASE = 'momenter/YEAR_INCREASE';
const YEAR_DECREASE = 'momenter/YEAR_DECREASE';

const GET_VACATION = 'momenter/GET_VACATION';
const GET_VACATION_SUCCESS = 'momenter/GET_VACATION_SUCCESS';
const GET_VACATION_FAILURE = 'momenter/GET_VACATION_FAILURE';

const GET_HOLIDAY = 'momenter/GET_HOLIDAY';
const GET_HOLIDAY_SUCCESS = 'momenter/GET_HOLIDAY_SUCCESS';
const GET_HOLIDAY_FAILURE = 'momenter/GET_HOLIDAY_FAILURE';

const GET_EVENT = 'momenter/GET_EVENT';
const GET_EVENT_SUCCESS = 'momenter/GET_EVENT_SUCCESS';
const GET_EVENT_FAILURE = 'momenter/GET_EVENT_FAILURE';


/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.
export const yearIncrease = () => ({ type: YEAR_INCREASE });
export const yearDecrease = () => ({ type: YEAR_DECREASE });
export const monthIncrease = () => ({ type : MONTH_INCREASE });
export const monthDecrease = () => ({ type : MONTH_DECREASE });


/* 초기 상태 선언 */
const initialState = {
    momentValue: moment(),
    holiday: null,
    event:null,
    vacation : null,
    loading: {
        GET_HOLIDAY: false,
        GET_EVENT : false,
        GET_VACATION : false,
    },
};


export const getVacation = momentValue => async dispatch => {
    dispatch({ type: GET_VACATION});
    try {
        const response = await api.getVacation(momentValue.format('YYYY'), momentValue.format('MM'));
        dispatch({
            type : GET_VACATION_SUCCESS,
            payload : response ? response : null
        })
    } catch (e) {
        dispatch({
            type : GET_VACATION_FAILURE,
            payload : e,
            error : true
        })
        throw e;
    }
};

export const getEvent = momentValue => async dispatch => {
    dispatch({ type: GET_EVENT });
    try {
        const response = await api.getNewEvent(momentValue.format('YYYY'),momentValue.format('MM')); // API 호출
        console.log("가져온 이벤트 : ", response)
        dispatch({
            type: GET_EVENT_SUCCESS,
            payload: response? response : null
        });
    } catch (e) {
        dispatch({
            type: GET_EVENT_FAILURE,
            payload: e,
            error: true
        });
        throw e;
    }
};

export const getHoliday = momentValue => async dispatch => {
    dispatch({ type: GET_HOLIDAY });
    try {
        const response = await api.getHoliday(momentValue.format('YYYY'),momentValue.format('MM')); // API 호출
        console.log(response)
        const item = response.data.response.body.items.item;
        console.log("공휴일 데이터 : ",item)
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

        case GET_VACATION :
            return {
                ... state,
                loading: {
                    ...state.loading,
                    GET_VACATION: true
                }
            }
        case GET_VACATION_SUCCESS :
            return {
                ...state,
                loading: {
                    ...state.loading,
                    GET_VACATION: false

                },
                vacation: action.payload
            }
        case GET_VACATION_FAILURE :
            return {
                ...state,
                loading: {
                    ...state.loading,
                    GET_VACATION: false
                }
            }

        case GET_EVENT :
            return {
                ... state,
                loading: {
                    ...state.loading,
                    GET_EVENT: true
                }
            }
        case GET_EVENT_SUCCESS :
            return {
                ...state,
                loading: {
                    ...state.loading,
                    GET_EVENT: false

                },
                event: action.payload

            }
        case GET_EVENT_FAILURE :
            return {
                ...state,
                loading: {
                    ...state.loading,
                    GET_EVENT: false
                }
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