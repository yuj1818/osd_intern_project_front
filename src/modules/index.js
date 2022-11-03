import { combineReducers } from 'redux';
import auth, {authSaga} from "./auth";
import {all} from 'redux-saga/effects';
import menus from "./menus";
import days from "./days";
import momenter from "./calendar/momenter";
import newEventCRUD, {writeSaga} from "./calendar/newEventCRUD"
import loading from "./loading";
import user, {userSaga} from "./user";
import team, {teamSaga} from "./team";

const rootReducer = combineReducers({
    auth,
    menus,
    days,
    momenter,
    newEventCRUD,
    loading,
    user,
    team,
});

export function* rootSaga() {
    yield all([writeSaga(), authSaga(), userSaga(), teamSaga()]);
}

export default rootReducer;