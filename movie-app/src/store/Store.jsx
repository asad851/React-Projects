import { configureStore } from "@reduxjs/toolkit";
import homeSlicer from "./homeSlicer";
import MyListSlicer from "./MyListSlicer";
export const store = configureStore({
    reducer:{
       home:homeSlicer,
       mylist:MyListSlicer
    }
})