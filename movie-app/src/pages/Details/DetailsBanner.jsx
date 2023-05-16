import React ,{useEffect,useState}from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../Components/Img";
import noposter from "../../assets/no-poster.png";
import dayjs from "dayjs";
import Genre from "../../Components/Genre";
import Rating from "../../Components/Rating";
import "./style.css";
import Playbtn from "./Playbtn";
import {VscAdd} from "react-icons/vsc"

export default function DetailsBanner({ crew }) {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((state) => state.home);
  const[width,Setwidth] = useState("82px")
  const[height,SetHeight]=useState("82px")
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [clicked, setClicked] = useState(false)
  const[clicks,SetClicks] =useState(1)
  const myListObj = {media:mediaType,
                    id:id}
  const  myList =[];
  
  const handleAddToList=()=>{
    myList.push(myListObj)
    SetClicks(clicks+1)
    
    for(let i=1; i<=1000; i++){
        if(clicks===(2*i-1)){
         setClicked(true)
        }else if(clicks===2*i){
          setClicked(false)
        }
    }
    
    
  }
  // console.log(clicked)
  
  const handlechnage=(fn)=>{
     setScreenWidth(window.innerWidth)
     fn()
    }
    
    const setdimension =()=>{
      if(screenWidth>=768){
        SetHeight(height)
        Setwidth(width)
      }else{
        SetHeight("72px")
        Setwidth("72px")
      }
    }
  // console.log(height,width)
  useEffect(() => {
    window.addEventListener("resize",()=>handlechnage(setdimension))
  
    return () => {
      window.removeEventListener("resize",()=>handlechnage(setdimension))
    }
  }, [screenWidth])
  

  const moviedata = data?.data;
  const genreName = moviedata?.genres.map((items) => items.id);
  const watchTime =
    moviedata?.runtime % 60 === 0
      ? `${moviedata?.runtime / 60} h `
      : `${Math.floor(moviedata?.runtime / 60)}h ${moviedata?.runtime % 60}m`;
  const producers = crew?.find((crew) => crew.job === "Producer");
  const directors = crew?.find((crew) => crew.job === "Director");
  
  
  
  const background = url.backdrop + moviedata?.poster_path;
  return (
    <div className="w-full pt-[100px] mb-[50px] min-[768px]:pt-[120px] min-[768px]:mb-0  min-[768px]:h-[700px]">
      {!loading ? (
        <>
          {data && (
            <>
              <div className="h-full w-full  absolute top-0 left-0  opacity-[0.1] overflow-hidden ">
                <Img
                  className=" h-full w-full   object-cover object-center"
                  src={background}
                />
              </div>
              <div className=" opacitylayer w-full h-[250px] absolute bottom-0 left-0"></div>
              <div
                id="wrapper"
                className="w-full max-w-[1200px] px-[20px] mx-auto "
              >
                <div
                  id="contentbox"
                  className="flex flex-col relative gap-[25px] min-[768px]:flex-row min-[768px]:gap-[50px]"
                >
                  <div id="leftContent" className="shrink-0">
                    <Img
                      className="w-full block rounded-[12px] min-[768px]:max-w-[350px] mt-[10px]"
                      src={moviedata?.poster_path ? background : noposter}
                    />
                  </div>
                  <div className="text-white flex flex-col ">
                    <div className="text-[28px] leading-[48px] min-[768px]:text-[34px] min-[768px]:leading-[44px]">
                      {`${moviedata?.name || moviedata?.title} (${dayjs(
                        moviedata?.release_date
                      ).format("YYYY")})`}
                    </div>
                    <div className="italic  opacity-[0.5] text-[16px] leading-[24px] mb-[15px] min-[768px]:text-[20px] min-[768px]:leading-[28px]  ">
                      {moviedata?.tagline}
                    </div>

                    <Genre
                      classDetails="mb-25px flex flex-row flex-wrap "
                      data={genreName}
                    />
                    <div
                      id="Circlerating"
                      className="flex items-center justify-start gap-[15px] mt-[20px] mb-[20px]"
                    >
                      <Rating
                        className="max-w-[70px] max-h-[70px] bg-[rgba(10,10,14)] min-[768px]:max-w-[90px] min-[768px]:max-h-[90px] flex justify-center items-center fill-white   "
                        rating={moviedata?.vote_average.toFixed(1)}
                      />
                      <div
                      
                        id="play"
                        className="flex items-center gap-[10px] min-[768px]:gap-[20px] cursor-pointer"
                      >
                        <Playbtn height={height}
                      width ={width} />
                        <span className="text-[16px] min-[768px]:text-[20px] transition-all ease-in-out duration-700 hover:text-[rgba(67,137,216)]">
                          Watch Trailer
                        </span>
                        

                      </div>
                      <div className="flex overflow-hidden flex-wrap  justify-center items-center gap-[10px] cursor-pointer  ">
                          <VscAdd className={`font-extrabold text-[30px] min-[768px]:text-[40px] transition-[transform] duration-500 ease-in-out ${clicked?"rotate-[135deg] hover:text-red-600":""} hover:text-[rgba(67,137,216)]`}   onClick={handleAddToList}/>
                          <span className="text-[16px]  min-[768px]:text-[20px] transition-colors ease-in duration-500 ">{clicked?"Remove":"Add"}</span>
                        </div>
                    </div>
                    <div>
                      <div className="">
                        <div className="text-[22px] font-bold">Overview</div>
                        <div className="leading-[20px] mt-[18px] text-[16px] opacity-[0.5] min-[768px]:pr-[100px] ">
                          {moviedata?.overview && moviedata?.overview}
                        </div>

                        <div className="mt-[20px] flex gap-[10px] min-[768px]:gap-[25px] ">
                          {moviedata?.status && (
                            <div className="text-[16px] font-semibold ">
                              Status :{" "}
                              <span className="text-[16px] min-[768px]:ml-[10px] opacity-[0.5] font-medium ">
                                {moviedata?.status}{" "}
                              </span>{" "}
                            </div>
                          )}
                          {moviedata?.release_date && (
                            <div className="text-[16px] font-semibold">
                              Relase Date :{" "}
                              <span className="text-[16px] min-[768px]:ml-[10px] opacity-[0.5] font-medium ">
                                {dayjs(moviedata?.release_date).format(
                                  "D MMM YYYY"
                                )}
                              </span>
                            </div>
                          )}
                          {moviedata?.runtime && (
                            <div className="text-[16px] font-semibold">
                              Watch Time :{" "}
                              <span className="text-[16px] min-[768px]:ml-[10px] opacity-[0.5] font-medium ">
                                {watchTime}
                              </span>{" "}
                            </div>
                          )}
                        </div>
                        <span className="inline-block w-full h-[0.2px] mt-[20px] opacity-[0.3] bg-white"></span>
                        {producers&&    <>

                        <div className="text-[17px] font-semibold mt-[10px]">
                          Producer :{" "}
                          <span className=" min-[768px]:ml-[10px] font-medium text-[16px] opacity-[0.5]  ">
                            {producers?.name}
                          </span>
                        </div>
                        <span className="inline-block w-full h-[0.2px]  opacity-[0.3] bg-white"></span>
                         </>}

                        
                        {directors&&<><div className="text-[17px] font-semibold mt-[10px]">
                          Director :{" "}
                          <span className=" min-[768px]:ml-[10px] font-medium text-[16px] opacity-[0.5]  ">
                            {directors?.name}
                          </span>
                        </div>
                        <span className="inline-block w-full h-[0.2px]  opacity-[0.3] bg-white"></span></>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
