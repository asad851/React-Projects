import React from "react";
import useFetch from "../Hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Img from "../Components/Img";
import Rating from "../Components/Rating";
import Genre from "../Components/Genre";
import dayjs from "dayjs";  
import noposter from "../assets/no-poster.png"




export default function SearchResult() {
  const { query } = useParams();
  const navigate = useNavigate()
  const{data,loading} = useFetch(`/search/multi?query=${query}&page=1`)
  const {url} = useSelector((state)=>state.home)
  console.log(data?.data?.results)
  const Search =data?.data?.results
  const skeleton = () => {
    return (
      <div className="w-[125px] min-[768px]:w-[calc(25%-15px)] lg:w-[calc(20%-16px)] shrink-0 ] ">
        <div className="rounded-[12px] w-full aspect-[1/1.5] mb-[30px] skeleton  "></div>
        <div className="flex flex-col">
          <div className="w-full h-[20px] mb-[10px] skeleton "></div>
          <div className="w-[75%] h-[20px] skeleton animate-pulse"></div>
        </div>
      </div>
    );
  };
  return (
    <div className="max-w-[1200px] w-full px-[20px] mx-auto min-[768px]:pt-[120px]  pt-[60px] ">
      {!loading ? (
          <div
            // ref={CarouselContainer}
            className="flex gap-[20px] justify-center  flex-wrap mr-[-20px] ml-[-20px] px-[20px] min-[768px]:gap-[20px] min-[768px]:overflow-hidden min-[768px]:m-0 min-[768px]:p-0 items-center h-full"
          >
            {Search?.map((item) => {
              const postUrl = item.poster_path
                ? url.backdrop + item.poster_path
                : noposter;
              return (
                <div
                  key={item.id}
                  className="w-[calc(48%-10px)]   cursor-pointer shrink-0 min-[768px]:w-[calc(25%-15px)] lg:w-[calc(20%-16px)] h-full py-[10px] hover:scale-[1.02] duration-200 ease-linear "
                  onClick={() =>
                    navigate(`/${item.media_type || endpoint}/${item.id}`)
                  }
                >
                  <div className="w-full h-full aspect-[1/1.5] mb-[20px] relative  flex items-end justify-between ">
                    <Img
                      src={postUrl}
                      className="rounded-[12px] h-full  w-full top-0 left-0 overflow-hidden bg-center object-center object-cover "
                    />
                    <div className="flex justify-between">
                    <Rating classCarousel=" bg-white absolute bottom-[-15px]  left-[20px]  h-[43px] w-[43px] min-[768px]:w-[53px] min-[768px]:h-[53px] flex justify-center items-center max-[768px]:hidden" rating={item.vote_average.toFixed(1)} />
                    <Genre 
                      classNamecarousel="flex-col absolute bottom-[20px] right-[20px] hidden justify-end min-[912px]:flex  flex-wrap  "
                      data={item?.genre_ids?.slice(0, 2)}
                      />
                      </div>
                  </div>
                  <div className="flex text-white flex-col ">
                    <span className="text-[16px] text-white  mb-[10] leading-[24px] min-[768px]:text-[20px] truncate">
                      {item.title || item.name}
                    </span>
                    <span className="text-[13px] opacity-[0.5]">
                      {dayjs(item.release_Date).format("D MMM, YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>):(<div className="flex gap-[10px] overflow-y-hidden  mx-[-20px] px-[20px] min-[768px]:gap-[20px] min-[768px]:overflow-hidden min-[768px]:m-0 min-[768px]:p-0">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>)}
    </div>
     ); 
}
