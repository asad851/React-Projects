import { configureStore } from "@reduxjs/toolkit";
import homeSlicer from "./homeSlicer";
export const store = configureStore({
    reducer:{
       home:homeSlicer,
    }
})