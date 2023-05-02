import React,{useState} from "react";
import useFetch from "../../Hooks/useFetch";
import Switch from "../../Components/Switch";
import Carousel from "../../Components/Carousel";

export default function Trending() {
  const [endpoint, setEndpoint] = useState("day")
  const {data,loading} =useFetch(`/trending/all/${endpoint}`)
  const onSwitch = (tab) => {
     setEndpoint(tab==="Day"?"day":"week")
  };
  return (
    <div className="relative mb-[70px]">
      <div className="w-full max-w-[1200px] mx-auto px-[20px] flex justify-between items-center mb-[20px] max-[306px]:flex-col ">
        <span className="text-[20px] font-medium  text-white" >Trending</span>
        <Switch time={["Day", "Week"]} onSwitch={onSwitch} />
      </div>
        <div>
          <Carousel data={data?.data?.results} loading={loading}/>
        </div>
    </div>
  );
}
