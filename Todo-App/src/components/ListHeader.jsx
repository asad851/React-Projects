import Modal from "./Modal"
import { useSelector,useDispatch } from "react-redux"
import { open } from "./showModalSlicer"
import { add } from "./EditMode"


export default function ListHeader() {
    const showModal=useSelector((state)=>state.showModal.value)
    const dispatch = useDispatch()
  return (
    <>
      <div className="listHeader">
        <h1>ToDo App</h1>
        <div className="button-container">
          <button onClick={()=>(dispatch(open()),
            dispatch(add()))} className="Add">
            Add
          </button>
        </div>
      {showModal&& <Modal/>}
      </div>
    </>
  )
}
