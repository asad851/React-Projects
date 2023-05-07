import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// 
export default function Rating({ rating,className,classCarousel }) {
  return (
    <div className={`rounded-[50%]   text-black ${className?className:classCarousel}`}>
      <CircularProgressbar
        className={`text-[34px] font-[700] fill-[#04152d] relative   shrink-0 rounded-[50%] ${className?"m-[2px] w-[66px] h-[66px] min-[768px]:w-[86px] min-[768px]:h-[86px] bg-[#041226] ":"m-[2px] w-[39px] h-[39px] min-[768px]:w-[49px] min-[768px]:h-[49px] bg-white"}`} 
        value={rating}
        maxValue={10}
        text={rating}
        styles={buildStyles({
          pathColor:
            rating < 5 ? "red" : rating < 7 ? "rgb(241, 115, 136)" : "green",
        })}
      />
    </div>
  );
}
