import { combineReducers } from 'redux';
import auth from "./auth";
import menus from "./menus";
import days from "./days";
import loading from "./loading";
import calendarControl from "./calendarControl";

const rootReducer = combineReducers({
    auth,
    menus,
    days,
    loading,
    calendarControl,
});

export default rootReducer;