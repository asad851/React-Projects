import React from "react";
import { useSelector } from "react-redux";
import noprofile from "../../assets/profile.png";
import Img from "../../Components/Img";
import { BsCheckLg } from "react-icons/bs";

const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);

  return (
    <div className="relative mb-[50px] ">
      <div className="mx-auto max-w-[1200px] w-full px-[20px]">
        <div className="text-[24px] text-white mb-[25px]">Cast</div>
       
        {!loading && (
          <div className="flex h-full gap-[20px]  w-full overflow-y-scroll  min-[768px]:overflow-y-hidden mx-[-20px] px-[20px] min-[768px]:m-0 min-[768px]:p-0 ">
            {data?.map((actor) => {
              let profile = actor?.profile_path
                ? url.profile + actor?.profile_path
                : noprofile;
              return (
                <div key={actor.id} className="text-center text-white ">
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
