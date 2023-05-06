import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../Components/Img";
import noposter from "../../assets/no-poster.png";

useSelector;

export default function DetailsBanner() {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((state) => state.home);
  console.log(data?.data.poster_path);
  const background = url.backdrop+data?.data.poster_path;
  return (
    <div className="w-full pt-[100px] mb-[50px] min-[768px]:pt-[120px] min-[768px]:mb-0  min-[768px]:h-[700px]">
      {!loading ? <>
      {data && <>
        
        
          <div className="h-full w-full  absolute top-0 left-0  opacity-[0.1] overflow-hidden ">
            <Img
              className=" h-full w-full   object-cover object-[top_center]"
              src={background}
            />
          
        <div className=" opacitylayer w-full h-[250px] absolute bottom-0 left-0"></div> 
      </div>
       </>}</> : <></>}
    </div>
  );
}
