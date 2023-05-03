import React from 'react'
import { useSelector } from 'react-redux'
export default function genre({data}) {
  const {genre} = useSelector((state)=>state.home)
  // console.log(genre[data].)
  return (
    <div className='absolute bottom-[20px] right-[20px] flex gap-[5px] p-0 text-white  '>{data?.map((g)=>{
      if (!genre[g]?.name) return;
      return(<div className=" px-[3px] py-[1px] text-[12px] bg-blue-900 rounded-[5px] whitespace-nowrap" key={g}>{genre[g]?.name}</div>)
    })}</div>
  )
}
