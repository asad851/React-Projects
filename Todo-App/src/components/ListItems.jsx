import { remove ,edit} from "./todoSlicer"
import { open } from "./showModalSlicer"
import { useSelector,useDispatch } from "react-redux"
import Modal from "./Modal"

export default function ListItems() {
  const showModal = useSelector((state)=>state.showModal.value)
  const todos = useSelector((state)=>state.todos.todos)
  
  const dispatch = useDispatch()
 
  return (
    <>
    {/* <div className="Listitems">
      <p>{todos.mode}</p>
      <div className="button-container">
      <button onClick={handleEdit} className="Edit">Edit</button>
      <button  className="Delete">Delete</button>
      </div>
      {showModal&& <Modal/>}
    </div> */}
    </>
  )
}
