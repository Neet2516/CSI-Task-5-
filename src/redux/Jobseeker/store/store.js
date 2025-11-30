import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userslice";
import productReducer from "./productslice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  user: userReducer,
  products: productReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // 👈 sirf user ko save karna hai
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
