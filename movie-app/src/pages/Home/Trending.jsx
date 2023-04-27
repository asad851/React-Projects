import React,{useState} from "react";
import useFetch from "../../Hooks/useFetch";
import Switch from "../../Components/Switch";

export default function Trending() {
  const [endpoint, setEndpoint] = useState("day")
  const {data,loading} =useFetch(`/trending/all/${endpoint}`)
  const onSwitch = (tab) => {
     setEndpoint(tab==="Day"?"day":"week")
  };
  return (
    <div>
      <div className="w-full max-w-[1200px] mx-auto px-[20px] flex justify-between items-center">
        <span >Trending</span>
        <Switch time={["Day", "Week"]} onSwitch={onSwitch} />
      </div>
      
    </div>
  );
}
