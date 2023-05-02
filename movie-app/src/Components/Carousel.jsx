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
  const container = CarouselContainer?.current;
  
  const navigation = (dir) => {
    // console.log(container)
    //  const scrollamount =
    //  dir==="left"?container.scrollLeft - (container.offsetWidth+20)
    //              :container.scrollLeft + (container.offsetWidth+20)
    //  container.scrollTo({
    //   left:scrollamount,
    //   behaviour:"smooth",
    //  })
  };
   
  return (
    <div className="mb-[50px]">
      {/* <div>{data?.title&& <div> {data?.title}</div>}</div> */}
      <div className="relative max-w-[1200px] px-[20px] mx-auto w-full">
        <BsFillArrowLeftCircleFill
          className="absolute top-[44%] text-black text-[30px] z-[1]  cursor-pointer translate-y-[50%] opacity-[0.5] left-[30px] hover:opacity-[0.8] hidden min-[768px]:block "
          onClick={navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="absolute top-[44%] text-black text-[30px] z-[1] right-[50px] cursor-pointer translate-y-[50%] opacity-[0.5] hover:opacity-[0.8] hidden min-[768px]:block "
          onClick={navigation("right")}
        />
        {!loading ? (
          <div
            className="flex gap-[0px] overflow-y-hidden mr-[-20px] ml-[-20px] px-[20px] min-[768px]:gap-[20px] min-[768px]:overflow-hidden min-[768px]:m-0 min-[768px]:p-0 items-center h-full"
            ref={CarouselContainer}
          >
            {data?.map((item) => {
              const postUrl = item.poster_path
                ? url.poster + item.poster_path
                : noposter;
              return (
                <div
                  key={item.id}
                  className="w-[125px] cursor-pointer shrink-0 min-[768px]:w-[calc(25%-15px)] lg:w-[calc(20%-16px)] h-full  "
                  onClick={() =>
                    navigate(`/${item.media_type || endpoint}/${item.id}`)
                  }
                >
                  <div className="w-full h-full aspect-[1/1.5] mb-[30px] relative bg-cover flex items-end justify-between p-[10px]">
                    <Img
                      src={postUrl}
                      className="rounded-[12px] h-full  w-full top-0 left-0 overflow-hidden bg-center object-cover "
                    />
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
