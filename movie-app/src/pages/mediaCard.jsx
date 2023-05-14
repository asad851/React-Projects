import React from "react";

import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import noposter from "../assets/no-poster.png";
import Img from "..//Components/Img";
import Rating from "..//Components/Rating";
import Genre from "..//Components/Genre";
import ".//..//index.css";
import { useSelector } from "react-redux";

function MediaCard({ data, mediaType }) {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const postUrl = data?.poster_path
    ? url.backdrop + data?.poster_path
    : noposter;
  return (
    <div className="mb-[50px]">
      <div
        key={data?.id}
        className="w-[125px] cursor-pointer shrink-0 min-[768px]:w-[calc(25%-15px)] lg:w-[calc(20%-16px)] h-full   hover:scale-[0.98] duration-200 ease-linear flex "
        onClick={() =>
          navigate(`/${data?.media_type || mediaType}/${data?.id}`)
        }
      >
        <div className="w-full h-full aspect-[1/1.5] mb-[20px] relative  flex items-end justify-between ">
          <Img
            src={postUrl}
            className="rounded-[12px] h-full  w-full top-0 left-0 overflow-hidden bg-center object-center object-cover "
          />

          <Rating
            classCarousel=" bg-white absolute bottom-[-15px]  left-[20px]  h-[43px] w-[43px] min-[768px]:w-[53px] min-[768px]:h-[53px] flex justify-center items-center"
            rating={data?.vote_average.toFixed(1)}
          />
          <Genre
            classNamecarousel="flex-col absolute bottom-[20px] right-[20px] hidden justify-end min-[768px]:flex  flex-wrap"
            data={data?.genre_ids?.slice(0, 2)}
          />
        </div>
        <div className="flex text-white flex-col ">
          <span className="text-[16px] text-white  mb-[10] leading-[24px] min-[768px]:text-[20px] truncate">
            {data?.title || data?.name}
          </span>
          <span className="text-[13px] opacity-[0.5]">
            {dayjs(data?.release_date).format("D MMM, YYYY")}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MediaCard;
