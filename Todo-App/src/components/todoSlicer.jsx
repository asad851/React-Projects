import {createSlice} from '@reduxjs/toolkit'
import { nanoid } from '@reduxjs/toolkit'

const initialState = {
    todos:[]
}

export const todoSlicer = createSlice({
    name:"todo",
    initialState,
    reducers:{
     add:(state,action)=>{
        const todo={
            id:nanoid(),
            text:action.payload,
            
            
        }
        
         state.todos.push(todo)
        
      },
      remove:(state,action)=>{
        state.todos=state.todos.filter((todo)=>todo.id!==action.payload)
      },
      editTodo:(state,action)=>{
        const todo = state.todos.find(todo => todo.id === action.payload.id);
        if (todo) {
          todo.text = action.payload.text;
        }
      }

      
      
    
  },
    
})
export const {add,remove,editTodo}= todoSlicer.actions;
export default todoSlicer.reducer;