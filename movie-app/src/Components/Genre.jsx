import React, { useEffect, useRef, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function genre({ data }) {
  const { genre } = useSelector((state) => state.home);
  const Container = useRef();
  const[width,setWidth] = useState(0)
 const Function =()=>{
   const width = Container.current.offsetWidth
   setWidth(width)
   console.log(width)
 }
 useEffect(()=>{
  Function()
 },[])
  return (
    <div ref={Container}
      className={` gap-[5px] p-0 absolute bottom-[20px] right-[20px] text-white  hidden min-[768px]:flex min-[768px]:justify-end flex-wrap flex-row ${width>=115?"flex-col":"flex-row"}`}
    >
      {data?.map((g) => {
        if (!genre[g]?.name) return;
        return (
          <div
            
            className=" px-[3px] py-[1px] text-[12px] bg-blue-900 rounded-[5px] whitespace-nowrap"
            key={g}
          >
            {genre[g]?.name}
          </div>
        );
      })}
    </div>
  );
}
