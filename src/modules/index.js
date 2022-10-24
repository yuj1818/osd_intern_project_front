import { combineReducers } from 'redux';
import auth from "./auth";
import menus from "./menus";
import days from "./days";
import momenter from "./momenter";

const rootReducer = combineReducers({
    auth,
    menus,
    days,
    momenter,
});

export default rootReducer;