import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 

import userReducer from "../features/auth/slices/userSlice";
import authReducer, { initialState } from "../features/auth/slices/authSlice";
import weatherReducer from "../features/weather/slices/weatherSlice";

const preloadedState = {
    auth: initialState,
    user: {
        fName: "",
        lName: "",
        email: ""
    },
};

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "user"]
};

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    weather: weatherReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    preloadedState: preloadedState,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ["persist/PERSIST"],
        },
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store, persistor };