import { createSlice } from "@reduxjs/toolkit";
export const showModalSlicer = createSlice({
    name:"showModal",
    initialState:{
        value:false,
    },
    reducers:{
        open:(state,action)=>{
          state.value=true
        },
        close:(state,action)=>{
          state.value=false
        },
    },

})
 export default showModalSlicer.reducer;
 export const {open,close}= showModalSlicer.actions