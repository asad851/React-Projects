import React from 'react'
import useFetch from '../../Hooks/useFetch'
import Switch from "../../Components/Switch";
import Carousel from "../../Components/Carousel";
import { useState } from 'react';
function Family() {
    const [endpoint, setEndpoint] = useState("movie")
    
    const filters = {with_genres:"10751"}
    const {data,loading} =useFetch(`/discover/${endpoint}`,filters)
     const onSwitch = (tab) => {
       setEndpoint(tab==="Movies"?"movie":"tv")}
    //    console.log(endpoint)
  return (
    <div className="relative mb-[70px]">
      <div className="w-full max-w-[1200px] mx-auto px-[20px] flex justify-between items-center mb-[20px] max-[306px]:flex-col ">
        <span className="text-[24px] font-medium  text-white" >Family</span>
        <Switch category={["Movies", "Tv series"]} onSwitch={onSwitch} />
      </div>
        <div>
          <Carousel data={data?.data?.results} loading={loading} endpoint={endpoint}/>
        </div>
    </div>
  )
}

export default Family