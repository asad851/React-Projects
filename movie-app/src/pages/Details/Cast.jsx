import React, { useRef } from "react";
import { useSelector } from "react-redux";
import noprofile from "../../assets/profile.png";
import Img from "../../Components/Img";
import { BsCheckLg } from "react-icons/bs";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";


const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);
  const castContainer = useRef()
  const navigation = (dir) => {
    const container = castContainer.current;
   console.log(container.offsetWidth)
    const scrollamount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth +10)
        : container.scrollLeft + (container.offsetWidth + 10);
    container.scrollTo({
      left: scrollamount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative mb-[50px] ">
      <div className="mx-auto max-w-[1200px] w-full px-[20px] relative">
        <div className="text-[24px] text-white mb-[25px]">Cast</div>
        <BsFillArrowLeftCircleFill
          className="absolute top-[39%] text-black text-[30px] z-[1] rounded-[50%] border-none cursor-pointer translate-y-[50%] opacity-[0.5] hover:opacity-[0.6]  fill-white left-[30px]  hidden min-[768px]:block "
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="absolute top-[39%] text-black text-[30px] z-[1] right-[50px] cursor-pointer translate-y-[50%] opacity-[0.5] hover:opacity-[0.6] hidden min-[768px]:block fill-white"
          onClick={() => navigation("right")}
        />
        {!loading && (
          <div className="flex h-full gap-[20px]  w-full overflow-y-scroll mx-[-20px] px-[20px] min-[768px]:m-0 min-[768px]:p-0 " ref={castContainer}>
            {data?.map((actor) => {
              let profile = actor?.profile_path
                ? url.profile + actor?.profile_path
                : noprofile;
              return (
                <div key={actor.id} className="text-center text-white " >
                  <div className="overflow-hidden h-[125px] w-[125px] rounded-[50%] mb-[15px] min-[768px]:h-[175px] min-[768px]:w-[175px] min-[768px]:mb-[25px]">
                    <Img
                      src={profile}
                      className="h-full w-full block rounded-[50%] overflow-hidden object-cover object-[center-top] "
                    />
                  </div>
                  <div className="text-[14px] leading-[20px] font-semibold min-[768px]:text-[18px] min-[768px]:leading-[24px]">{actor.name}</div>
                  <div className="text-[14px] leading-[20px] opacity-[0.5] min-[768px]:text-[16px] min-[768px]:leading-[24px] ">{actor.character}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default Cast;
