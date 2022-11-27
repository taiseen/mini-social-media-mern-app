import themeSlice from "./features/themeSlice";
import authSlice from "./features/authSlice";
import postSlice from "./features/postSlice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    theme: themeSlice,
    auth: authSlice,
    post: postSlice,
});

export default rootReducer;