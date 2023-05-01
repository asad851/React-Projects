import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import noposter from "../assets/no-poster.png";
import Img from "./Img";

export default function Carousel({ data, loading }) {
  const CarouselContainer = useRef();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const navigation =(dir)=>{

  }
  return (
    <div className="mb-[50px]">
      {/* <div>{data?.title&& <div> {data?.title}</div>}</div> */}
      <div className="relative max-w-[1200px] px-[20px] mx-auto w-full">
      <BsFillArrowLeftCircleFill
       className="absolute top-[44%] text-black text-[30px] z-[1]  cursor-pointer translate-y-[50%] opacity-[0.5] left-[30px] hover:opacity-[0.8] hidden min-[768px]:block "
       onClick={navigation()}
      />
      <BsFillArrowRightCircleFill
       className="absolute top-[44%] text-black text-[30px] z-[1] right-[30px] cursor-pointer translate-y-[50%] opacity-[0.5] hover:opacity-[0.8] hidden min-[768px]:block "
       onClick={navigation()}
      />
      { !loading? (<div className="flex gap-[4px] overflow-y-scroll  ">
                     {data?.map((item)=>{
                      const postUrl= item.poster_path? url.poster + item.poster_path : noposter;
                      return(
                        <div key={item.id}
                         className="flex"
                         onClick={()=>navigate()}
                        >
                        
                        <div className="w-[150px] h-[250px] aspect-[1/1.5] mb-[30px]">
                          <Img src={postUrl} className="rounded-[15px] h-full w-full "/>
                        </div>

                        </div>

                      )
                    })}
                   </div>
      
         ) :
         (<></>) }
      </div>
    </div>
  );
}
