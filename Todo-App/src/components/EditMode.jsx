import { createSlice } from "@reduxjs/toolkit";

const initialState={
   value:false,
   
}

export const EditMode =createSlice({
    name:"editable",
    initialState,
    reducers:{
       edit:(state,action)=>{
        state.value=true;
        
      },
        
       add:(state)=>{
        state.value=false
       } 
    }
})
export default EditMode.reducer;
export const {edit,add}=EditMode.actions