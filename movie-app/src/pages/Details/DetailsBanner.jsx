import React, { useEffect, useState } from "react";
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
import { VscAdd } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { addToList,remove } from "../../store/MyListSlicer";


export default function DetailsBanner({ crew }) {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((state) => state.home);
  const [width, Setwidth] = useState("82px");
  const [height, SetHeight] = useState("82px");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [clicked, setClicked] = useState(false);
  
  const [right, setRight] = useState("-250px")
  const myListObj = { mediaType: `${mediaType}`, 
                      id: id,
                      poster_path:data?.data?.poster_path,
                      genres:data?.data?.genres,
                      title:data?.data?.title, 
                      name:data?.data?.name,
                      vote_average:data?.data?.vote_average,
                      release_date:data?.data?.release_date
                    };
  const {myListArr} = useSelector(state=>state.mylist)
  
  const myListArrstring = JSON?.stringify(myListArr)
  localStorage.setItem('myListArr',myListArrstring);
  const Arrstring= localStorage.getItem('myListArr');
  const Arraydata = JSON?.parse(Arrstring)
  
  // console.log(Arraydata)
  const dispatch =useDispatch()
  
  const handleAddToList = () => {
    setClicked(clicked?false:true)
    
    if(clicked){
      
      dispatch(remove(myListObj.id))
    }else if(clicked===false){
      dispatch(addToList(myListObj))
    }
    setRight("20px")
    setTimeout(() => {
      setRight("-250px")
    }, 2500);
    
  };
  
  const handlechnage = (fn) => {
    setScreenWidth(window.innerWidth);
    fn();
  };

  const ab = Arraydata?.find(list=>list.id===myListObj.id)
  
 

  function AddedOrNot(){
    if(ab){
          setClicked(true)
        }else{
          setClicked(false)
        }
  }
   useEffect(() => {
     AddedOrNot()
   }, [id])

   useEffect(() => {
    
      
    
  }, [clicked])

  const setdimension = () => {
    if (screenWidth >= 768) {
      SetHeight(height);
      Setwidth(width);
    } else {
      SetHeight("72px");
      Setwidth("72px");
    }
  };
  // console.log(height,width)
  useEffect(() => {
    window.addEventListener("resize", () => handlechnage(setdimension));

    return () => {
      window.removeEventListener("resize", () => handlechnage(setdimension));
    };
  }, [screenWidth]);

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
                        <Playbtn height={height} width={width} />
                        <span className="text-[16px] min-[768px]:text-[20px] transition-all ease-in-out duration-700 hover:text-[rgba(67,137,216)]">
                          Watch Trailer
                        </span>
                      </div>
                      {/* add to my list */}
                      <div className="flex overflow-hidden flex-wrap  justify-center items-center gap-[10px] cursor-pointer  ">
                        <VscAdd
                          className={`font-extrabold text-[30px] min-[768px]:text-[40px] transition-[transform] duration-500 ease-in-out ${
                            clicked ? "rotate-[135deg] hover:text-red-600" : ""
                          } hover:text-[rgba(67,137,216)]`}
                          onClick={handleAddToList}
                        />
                        <span className="text-[16px]  min-[768px]:text-[20px] transition-colors ease-in duration-500 ">
                          {clicked ? "Remove" : "Add"}
                        </span>
                      </div>
                    </div>
                    {/* Succes Toast */}
                    <div
                      id="toast-success"
                      className="flex fixed bottom-0   items-center w-full max-w-[250px] p-3 mb-4   rounded-lg shadow text-gray-400 bg-gray-800 z-10 transition-[right] duration-500 ease-[cubic-bezier(0.88,-0.35,0.565,1.35)] "
                      role="alert"
                      style={{right}}
                    >
                      <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8  rounded-lg ${clicked?"bg-green-800 text-green-200":"bg-red-800 text-red-200"} `}>
                        {clicked ? (
                          <>
                            <svg
                              aria-hidden="true"
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                            <span className="sr-only">Check icon</span>
                          </>
                        ) : (
                          <>
                            <svg
                              aria-hidden="true"
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                            <span className="sr-only">Error icon</span>
                          </>
                        )}
                      </div>
                      <div className="ml-3 text-sm font-normal">
                        {moviedata?.name || moviedata?.title} {clicked?"added to my list":"removed from my list"}
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
                        {producers && (
                          <>
                            <div className="text-[17px] font-semibold mt-[10px]">
                              Producer :{" "}
                              <span className=" min-[768px]:ml-[10px] font-medium text-[16px] opacity-[0.5]  ">
                                {producers?.name}
                              </span>
                            </div>
                            <span className="inline-block w-full h-[0.2px]  opacity-[0.3] bg-white"></span>
                          </>
                        )}

                        {directors && (
                          <>
                            <div className="text-[17px] font-semibold mt-[10px]">
                              Director :{" "}
                              <span className=" min-[768px]:ml-[10px] font-medium text-[16px] opacity-[0.5]  ">
                                {directors?.name}
                              </span>
                            </div>
                            <span className="inline-block w-full h-[0.2px]  opacity-[0.3] bg-white"></span>
                          </>
                        )}
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
