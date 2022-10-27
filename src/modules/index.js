import { combineReducers } from 'redux';
import auth from "./auth";
import menus from "./menus";
import days from "./days";
import momenter from "./calendar/momenter";
import newEventWrite from "./calendar/newEventWrite"

const rootReducer = combineReducers({
    auth,
    menus,
    days,
    momenter,
    newEventWrite
});

export default rootReducer;