import React, { useEffect, useRef, useState } from "react";
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
import "../index.css";

export default function Carousel({ data, loading,endpoint,title }) {
  const CarouselContainer = useRef();
  const genrebox = useRef()
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  // console.log(data)

  const navigation = (dir) => {
    const container = CarouselContainer.current;

    const scrollamount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);
    container.scrollTo({
      left: scrollamount,
      behavior: "smooth",
    });
  };
  
//  console.log(data)
  const skeleton = () => {
    return (
      <div className="w-[125px] min-[768px]:w-[calc(25%-15px)] lg:w-[calc(20%-16px)] shrink-0 ] ">
        <div className="rounded-[12px] w-full aspect-[1/1.5] mb-[30px] skeleton animate-pulse "></div>
        <div className="flex flex-col">
          <div className="w-full h-[20px] mb-[10px] skeleton "></div>
          <div className="w-[75%] h-[20px] skeleton animate-pulse"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="mb-[50px]">
      {title&&<div className="text-white text-[24px] font-medium mb-[10px] max-w-[1200px] w-full px-[20px]
      mx-auto ">{title}</div>}
      <div>{data?.title&& <div> {data?.title}</div>}</div>
      <div className="relative max-w-[1200px] px-[20px] mx-auto w-full ">
        <BsFillArrowLeftCircleFill
          className="absolute top-[44%] text-black text-[30px] z-[1] rounded-[50%] border-none cursor-pointer translate-y-[50%] opacity-[0.5] hover:opacity-[0.6]  fill-white left-[30px]  hidden min-[768px]:block "
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="absolute top-[44%] text-black text-[30px] z-[1] right-[50px] cursor-pointer translate-y-[50%] opacity-[0.5] hover:opacity-[0.6] hidden min-[768px]:block fill-white"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div
            ref={CarouselContainer}
            className="flex gap-[10px] overflow-y-hidden mr-[-20px] ml-[-20px] px-[20px] min-[768px]:gap-[20px] min-[768px]:overflow-hidden min-[768px]:m-0 min-[768px]:p-0 items-center h-full"
          >
            {data?.map((item) => {
              const postUrl = item.poster_path
                ? url.backdrop + item.poster_path
                : noposter;
              return (
                <div
                  key={item.id}
                  className="w-[125px] cursor-pointer shrink-0 min-[768px]:w-[calc(25%-15px)] lg:w-[calc(20%-16px)] h-full py-[10px] hover:scale-[1.02] duration-200 ease-linear "
                  onClick={() =>
                    navigate(`/${item.media_type || endpoint}/${item.id}`)
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
        ) : (
          <div className="flex gap-[10px] overflow-y-hidden  mx-[-20px] px-[20px] min-[768px]:gap-[20px] min-[768px]:overflow-hidden min-[768px]:m-0 min-[768px]:p-0">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </div>
    </div>
  );
}
