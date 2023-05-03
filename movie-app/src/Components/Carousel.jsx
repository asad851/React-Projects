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
import Rating from "./Rating";
import Genre from "./Genre";

export default function Carousel({ data, loading }) {
  const CarouselContainer = useRef();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  
  const navigation = (dir) => {
    
    const container = CarouselContainer.current;
    
     const scrollamount =
     dir==="left"?
                   container.scrollLeft - (container.offsetWidth+20)
                  :container.scrollLeft + (container.offsetWidth+20)
     container.scrollTo({
      left:scrollamount,
      behavior:"smooth",
     })
  };
  const skeleton=()=>{

  }
  
  return (
    <div className="mb-[50px]">
      {/* <div>{data?.title&& <div> {data?.title}</div>}</div> */}
      <div className="relative max-w-[1200px] px-[20px] mx-auto w-full">
        <BsFillArrowLeftCircleFill
          className="absolute top-[44%] text-black text-[30px] z-[1]  cursor-pointer translate-y-[50%] opacity-[0.5] left-[30px] hover:opacity-[0.8] hidden min-[768px]:block "
          onClick={()=>navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="absolute top-[44%] text-black text-[30px] z-[1] right-[50px] cursor-pointer translate-y-[50%] opacity-[0.5] hover:opacity-[0.8] hidden min-[768px]:block "
          onClick={()=>navigation("right")}
        />
        {!loading ? (
          <div
            ref={CarouselContainer}
            className="flex gap-[0px] overflow-y-hidden mr-[-20px] ml-[-20px] px-[20px] min-[768px]:gap-[20px] min-[768px]:overflow-hidden min-[768px]:m-0 min-[768px]:p-0 items-center h-full"
            
          >
            {data?.map((item) => {
              const postUrl = item.poster_path
                ? url.poster + item.poster_path
                : noposter;
              return (
                <div
                  key={item.id}
                  className="w-[125px] cursor-pointer shrink-0 min-[768px]:w-[calc(25%-15px)] lg:w-[calc(20%-16px)] h-full hover:scale-[1.02] duration-200 ease-linear "
                  onClick={() =>
                    navigate(`/${item.media_type || endpoint}/${item.id}`)
                  }
                >
                  <div className="w-full h-full aspect-[1/1.5] mb-[20px] relative bg-cover flex items-end justify-between p-[10px]">
                    <Img
                      src={postUrl}
                      className="rounded-[12px] h-full  w-full top-0 left-0 overflow-hidden bg-center object-cover "
                    />
                    
                    <Rating rating={item.vote_average.toFixed(1)} />
                    <Genre className="  " data={item?.genre_ids?.slice(0,2)}/>
                    
                    
                   
                  </div>
                  <div className="flex text-white flex-col ">
                  <span className="text-[16px] text-white  mb-[10] leading-[24px] min-[768px]:text-[20px] truncate">
                    {item.title||item.name}
                  </span>
                  <span className="text-[13px] opacity-[0.5]">
                    {dayjs(item.release_Date).format("D MMM, YYYY")}
                  </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
