import { configureStore } from "@reduxjs/toolkit";
import user from './userSlice'
import filter from "./filterSlice";

export const store = configureStore({
    reducer:{
        user,
        filter
    }
})