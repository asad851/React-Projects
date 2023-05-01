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
  const navigation =(dir)=>{

  }
  return (
    <div>
      {/* <div>{data?.title&& <div> {data?.title}</div>}</div> */}
      <div>
      <BsFillArrowLeftCircleFill
       className=""
       onClick={navigation()}
      />
      <BsFillArrowRightCircleFill
       className=""
       onClick={navigation()}
      />
      { !loading? (<div className="flex gap-[10px] overflow-y-scroll justify-center px-[20px]">
                     {data?.map((item)=>{
                      const postUrl= item.poster_path? url.poster + item.poster_path : noposter;
                      return(
                        <div key={item.id}
                         className="flex"
                         onClick={()=>navigate()}
                        >
                        
                        <div className="w-[150px] h-[250px] shadow-md">
                          <Img src={postUrl} className="rounded-[12px] h-full w-full "/>
                        </div>

                        </div>

                      )
                    })}
                   </div>
      
         ) :
         (<></>) }
      </div>
    </div>
  );
}
