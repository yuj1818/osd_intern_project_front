import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {createRequestActionTypes,} from "../../lib/createRequestSaga";
import * as api from "../../lib/api"
import { takeLatest } from "redux-saga/effects";

const CHANGE_FIELD = 'NewEventWrite/CHANGE_FILED';
const INITIALIZE = 'NewEventWrite/INITIALIZE';
const [
    NEW_EVENT_WRITE,
    NEW_EVENT_WRITE_SUCCESS,
    NEW_EVENT_WRITE_FAILURE,
] = createRequestActionTypes('newEventCRUD/NEW_EVENT_WRITE');

export const changeField = ({_key, _value}) => ({ type : CHANGE_FIELD, _key, _value })
export const initialize = () => ({ type : INITIALIZE});
export const newEventWrite = createAction(NEW_EVENT_WRITE,
                    ({
                                    title,
                                    category,
                                    startDate,
                                    endDate
                                }) => ({
                                    title,
                                    category,
                                    startDate,
                                    endDate
                                }));

// 사가 생성
const newEventWriteSaga = createRequestSaga(NEW_EVENT_WRITE, api.addNewEvent);

export function* writeSaga() {
    yield takeLatest(NEW_EVENT_WRITE,newEventWriteSaga);
}

const initialState = {
    newEventData : {
        title : '',
        category : '',
        startDate : '',
        endDate : ''
    },
}

export default function newEventCRUD (state = initialState, action) {
    switch (action.type) {
        case CHANGE_FIELD :
            return  {
                ...state,
                newEventData: {
                    ...state.newEventData,
                    [action._key] : action._value
                }
            }

        case INITIALIZE :
            return {
                ...state,
                newEventData: initialState.newEventData
            }
        case NEW_EVENT_WRITE :
            return {
                ...state,
                newEventData : action.payload,
                post : null,
                postError: null,
            }
        case NEW_EVENT_WRITE_SUCCESS :
            return {
                ...state,
                post : action.payload,
            }
        case NEW_EVENT_WRITE_FAILURE :
            return {
                ...state,
                postError: action.payload,
            }
        default:
            return state;
    }
}
