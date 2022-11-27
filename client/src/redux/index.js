import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";


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