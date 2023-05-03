import {  createSlice } from "@reduxjs/toolkit";

export const homeSlicer = createSlice({
    name:"home",
    initialState:{
    url:{},
    genre:{},
    },
    reducers:{
        getApiConfig:(state,action)=>{
            state.url=action.payload;
        },
        getGenre:(state,action)=>{
            state.genre=action.payload
        }
    }

})
export default homeSlicer.reducer;
export const {getApiConfig,getGenre}= homeSlicer.actions;