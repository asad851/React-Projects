import React from 'react'
import { VscChromeClose } from "react-icons/vsc";

function GenresModal({data,setShowModal,setGenre}) {
    console.log(data)
  return (
    <div >
        <div className='bg-white opacity-0.9 absolute top-0 bottom-0 left-0 right-0  flex z-[1] justify-center '>
        <ul className=" flex justify-center items-center flex-col ">{data?.map((genreName)=>
            (<li className=' cursor-pointer list-none font-semibold text-black text-[20px] active:bg-slate-200 px-[100px] max-[768px]:cursor-default rounded-[5px]' onclick={()=>{setGenre(genreName.id) 
            setShowModal(false)}
            }>{genreName.name}</li>)
        )}
        < VscChromeClose className='text-[35px] p-[5px] mt-[20px] rounded-[50%] font-extrabold active:bg-slate-200 cursor-pointer max-[768px]:cursor-default' onClick={()=>setShowModal(false)}/>
        </ul>
        </div>
        
    </div>
  )
}

export default GenresModal;