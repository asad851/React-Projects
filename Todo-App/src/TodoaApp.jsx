import { useSelector,useDispatch } from "react-redux";
import { useState } from "react";
import {add,remove} from "./components/todoSlicer"
import { open } from "./components/showModalSlicer";
import { edit } from "./components/EditMode";
import Modal from "./components/Modal";
import ListHeader from "./components/ListHeader";


export default function TodoaApp() {
    const showModal = useSelector((state)=>state.showModal.value)
    const [editId,setEditId]=useState(null)
    const [text,setText] = useState('')
    const todos = useSelector((state)=>state.todos.todos)
    
    const dispatch = useDispatch()
    const handleEdit =(id,text)=>{
      dispatch(open())
      dispatch(edit())
      setEditId(id)
      setText(text)
      
     }
    
  return (
    <> 
    <div className="app">
    <ListHeader/>
    {todos?.map((t)=>(
      <div key={t.id}>
      <div className="Listitems">
      <p >{t.text}</p>
      
      <div className="button-container">
      <button onClick={()=>handleEdit(t.id,t.text)} className="Edit">Edit</button>
      <button  className="Delete" onClick={()=>dispatch(remove(t.id))}>Delete</button>
      </div>
      {showModal&& <Modal text={text} setEditId={setEditId} editId={editId} />}
    </div>
      </div>
    ))}
    </div>
    </>
  )
}
