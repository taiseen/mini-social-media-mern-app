import { configureStore } from "@reduxjs/toolkit";
import {combineReducers} from "redux"; 
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./features/authSlice";
import themeSlice from "./features/themeSlice";
import postSlice from "./features/postSlice";

const rootReducer = combineReducers({
    theme: themeSlice,
    auth: authSlice,
    post: postSlice,
});

const persistConfig = { key: "root", storage, version: 1 };

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({

    reducer: persistedReducer,

    middleware: getDefaultMiddleware =>

        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});


export default store;