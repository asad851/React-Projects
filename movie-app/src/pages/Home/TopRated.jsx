import React,{useState} from "react";
import useFetch from "../../Hooks/useFetch";
import Switch from "../../Components/Switch";
import Carousel from "../../Components/Carousel";

export default function TopRated() {
  const [endpoint, setEndpoint] = useState("movie")
  const {data,loading} =useFetch(`/${endpoint}/top_rated`)
  const onSwitch = (tab) => {
     setEndpoint(tab==="Movies"?"movie":"tv")
  };
  return (
    <div className="relative mb-[70px]">
      <div className="w-full max-w-[1200px] mx-auto px-[20px] flex justify-between items-center mb-[20px] max-[306px]:flex-col ">
        <span className="text-[24px] font-medium  text-white" >Top Rated</span>
        <Switch category={["Movies", "Tv series"]} onSwitch={onSwitch} />
      </div>
        <div>
          <Carousel data={data?.data?.results} loading={loading} endpoint={endpoint}/>
        </div>
    </div>
  );}
