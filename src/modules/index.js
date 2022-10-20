import { combineReducers } from 'redux';
import auth from "./auth";
import menus from "./menus";
import days from "./days";

const rootReducer = combineReducers({
    auth,
    menus,
    days,
});

export default rootReducer;