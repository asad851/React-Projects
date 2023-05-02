import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Rating({ rating }) {
  return (
    <div className="rounded-[50%] absolute bottom-[-15px]  left-[20px] h-[43px] w-[43px] min-[768px]:w-[53px] min-[768px]:h-[53px] flex justify-center items-center bg-white text-black">
      <CircularProgressbar
        className="text-[34px] font-[700] fill-[#04152d] relative m-[2px] w-[39px] h-[39px] min-[768px]:w-[49px] min-[768px]:h-[49px]  bg-white shrink-0 rounded-[50%]   "
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
