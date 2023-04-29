import React from 'react'
import { useSelector,useDispatch } from "react-redux";
import { useState } from "react";
import {add} from "./todoSlicer"
import { editTodo } from './todoSlicer';
import { close } from './showModalSlicer';


function Modal(props) {
    const[input,setInput] =useState('')
    
    const todos =useSelector((state)=>state.todos.todos)
    const editMode = useSelector((state)=>state.editable.value)
    
    
    const dispatch = useDispatch()
    const handleSubmit = (e)=>{
        if(input===''){
            e.preventDefault()
        }
        if(editMode){
            e.preventDefault()
            dispatch(close())
            setInput(props.text)
          if(props.editId){
            
                dispatch(editTodo({ id: props.editId, text: input }));
                props.setEditId(null);
              } 
          }
        else{
            dispatch(add(input))
            e.preventDefault()
            dispatch(close())
        }
    }
  return (
   <>
  <div className="overlay">
      <div className="modal">
      <div className="form-title-container">
          <h3>Let's create your task</h3>
          <button onClick={()=>dispatch(close())}>X</button>
        </div>
        <form>
        <input 
        required
        type="text"
        placeholder="Your task goes here"
        onChange={(e)=>setInput(e.target.value)}
        value={input}
        
        />
        <br/>
        
        <input 
        type="submit" 
        value="Submit"
        className='submit'
        onClick={handleSubmit}
        />
         </form>
      </div>
      
    </div>

   </>
  )
}

export default Modal