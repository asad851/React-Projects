import {createSlice} from "@reduxjs/toolkit"

export const MyListSlicer = createSlice({
    name:"mylist",
    initialState:{
    myListArr:[],
    
    },
    reducers:{
       addToList:(state,action)=>{
          state.myListArr.push(action.payload)
       },
       remove:(state,action)=>{
        
        state.myListArr=state.myListArr.filter((list)=>list.id!==action.payload)
       }
    }

})
export default MyListSlicer.reducer;
export const {addToList,remove}= MyListSlicer.actions;