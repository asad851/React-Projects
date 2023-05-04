import React,{useState} from "react";
import useFetch from "../../Hooks/useFetch";
import Switch from "../../Components/Switch";
import Carousel from "../../Components/Carousel";

export default function Popular() {
  const [endpoint, setEndpoint] = useState("movie")
  const {data,loading} =useFetch(`/${endpoint}/popular`)
  const onSwitch = (tab) => {
     setEndpoint(tab==="Movie"?"movie":"tv")
  };
  return (
    <div className="relative mb-[70px]">
      <div className="w-full max-w-[1200px] mx-auto px-[20px] flex justify-between items-center mb-[20px] max-[306px]:flex-col ">
        <span className="text-[24px] font-medium  text-white" >Popular these days</span>
        <Switch time={["Movie", "Tv"]} onSwitch={onSwitch} />
      </div>
        <div>
          <Carousel data={data?.data?.results} loading={loading}/>
        </div>
    </div>
  );}