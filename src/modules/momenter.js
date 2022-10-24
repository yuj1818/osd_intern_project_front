import moment from "moment";

/* 액션 타입 만들기 */

const MONTH_INCREASE = 'momenter/MONTH_INCREASE';
const MONTH_DECREASE = 'momenter/MONTH_DECREASE';
const YEAR_INCREASE = 'momenter/YEAR_INCREASE';
const YEAR_DECREASE = 'momenter/YEAR_DECREASE';

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.
export const yearIncrease = () => ({ type: YEAR_INCREASE });
export const yearDecrease = () => ({ type: YEAR_DECREASE });
export const monthIncrease = () => ({ type : MONTH_INCREASE });
export const monthDecrease = () => ({ type : MONTH_DECREASE });

/* 초기 상태 선언 */
const initialState = {
    year : parseInt( moment().format('YY') ),
    month : parseInt( moment().format('MM') ),
};

/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
export default function momenter(state = initialState, action) {
    switch (action.type) {
        case YEAR_INCREASE:
            return {
                ...state,
                year: state.year + 1
            };
        case YEAR_DECREASE:
            return {
                ...state,
                year: state.year - 1
            };
        case MONTH_INCREASE:
            if (state.month === 12) {
                return {
                    ...state,
                    year : state.year + 1,
                    month: 1
                }
            }
            else {
                return {
                    ...state,
                    month: state.month + 1
                };
            }
        case MONTH_DECREASE:
            if (state.month === 1) {
                return {
                    ...state,
                    year : state.year - 1,
                    month: 12
                }
            }
            else {
                return {
                    ...state,
                    month: state.month - 1
                };
            }
        default:
            return state;
    }
}