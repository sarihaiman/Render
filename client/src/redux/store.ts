import { userReducer } from "./userReducers";
import { createStore } from "redux";
import { combineReducers } from "redux";

export const reducer=combineReducers({userReducer})



// export const reducer = combineReducers({
//     user: userReducer,
//     reports: reportsReducer,
//     activityLog: activityLogReducer
// });

export const store = createStore(reducer);
// window.store = store;