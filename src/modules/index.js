import { combineReducers } from 'redux';
import auth from "./auth";
import {all} from 'redux-saga/effects';
import menus from "./menus";
import days from "./days";
import momenter from "./calendar/momenter";
import newEventCRUD, {writeSaga} from "./calendar/newEventCRUD"

const rootReducer = combineReducers({
    auth,
    menus,
    days,
    momenter,
    newEventCRUD
});

export function* rootSaga() {
    yield all([writeSaga()]);
}

export default rootReducer;