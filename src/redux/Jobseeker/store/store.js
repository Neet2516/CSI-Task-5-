import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userslice";
import productReducer from "./productslice";

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
  },
});

export default store;
