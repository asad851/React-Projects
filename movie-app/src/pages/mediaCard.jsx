import React from 'react'
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import noposter from "../assets/no-poster.png";
import Img from "./Img";
import Rating from "./Rating";
import Genre from "./Genre";
import ".//..//index.css";

function mediaCard({data,mediaType}) {
 const navigate =useNavigate()
  
  return (
   <div className="mb-[50px]">

      
      <div className="relative max-w-[1200px] px-[20px] mx-auto w-full ">
       
    
          <div
            
            className="flex gap-[10px] flex-wrap mr-[-20px] ml-[-20px] px-[20px] min-[768px]:gap-[20px]  min-[768px]:m-0 min-[768px]:p-0 items-center h-full"
          >
            {data?.map((item) => {
              const postUrl = item.poster_path
                ? url.backdrop + item.poster_path
                : noposter;
              return (
                <div
                  key={item.id}
                  className="w-[125px] cursor-pointer shrink-0 min-[768px]:w-[calc(25%-15px)] lg:w-[calc(20%-16px)] h-full   hover:scale-[0.98] duration-200 ease-linear "
                  onClick={() =>
                    navigate(`/${item.media_type ||endpoint||mediaType}/${item.id}`)
                  }
                >
                  <div className="w-full h-full aspect-[1/1.5] mb-[20px] relative  flex items-end justify-between ">
                    <Img
                      src={postUrl}
                      className="rounded-[12px] h-full  w-full top-0 left-0 overflow-hidden bg-center object-center object-cover "
                    />

                    <Rating classCarousel=" bg-white absolute bottom-[-15px]  left-[20px]  h-[43px] w-[43px] min-[768px]:w-[53px] min-[768px]:h-[53px] flex justify-center items-center" rating={item.vote_average.toFixed(1)} />
                    <Genre 
                      classNamecarousel="flex-col absolute bottom-[20px] right-[20px] hidden justify-end min-[768px]:flex  flex-wrap"
                      data={item?.genre_ids?.slice(0, 2)}
                      
                    />
                  </div>
                  <div className="flex text-white flex-col ">
                    <span className="text-[16px] text-white  mb-[10] leading-[24px] min-[768px]:text-[20px] truncate">
                      {item?.title || item?.name}
                    </span>
                    <span className="text-[13px] opacity-[0.5]">
                      {dayjs(item?.release_date).format("D MMM, YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        
   </div>
   </div>
  )
}

export default mediaCard