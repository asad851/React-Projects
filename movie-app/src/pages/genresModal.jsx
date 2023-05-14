import React from 'react'
import { VscChromeClose } from "react-icons/vsc";

function GenresModal({data,setShowModal,setGenre,setGenreName}) {
    
  return (
    <div >
        <div className='bg-black opacity-[0.9] blur-[3] absolute top-0 bottom-0 left-0 right-0  flex z-[1] justify-center pt-[50px] '>
        <ul className=" flex justify-center items-center flex-col ">{data?.map((genreName,i)=>
            (<li key={i} className=' cursor-pointer list-none font-semibold text-white text-[18px] hover:bg-slate-600 px-[10px] max-[768px]:cursor-default rounded-[5px]' onClick={()=>{setGenre(genreName.id) 
            setShowModal(false)
            setGenreName(genreName.name)                    }
            }>{genreName.name}</li>)
        )}
        < VscChromeClose className=' text-white text-[35px] p-[5px] mt-10 min-[768px]:mt-[20px] rounded-[50%] font-extrabold hover:bg-slate-800 cursor-pointer max-[768px]:cursor-default' onClick={()=>setShowModal(false)}/>
        </ul>
        </div>
        
    </div>
  )
}

export default GenresModal;