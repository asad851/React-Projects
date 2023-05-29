import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import Img from "../../Components/Img";
import useFetch from "../../Hooks/useFetch";
import { useNavigate } from "react-router-dom";
import Playbtn from "../Details/Playbtn";
import { VscAdd } from "react-icons/vsc";
import { VscInfo } from "react-icons/vsc";
import VideoModal from "../Details/VideoModal";
import { addToList, remove } from "../../store/MyListSlicer";


export default function HeroBanner() {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const [width, Setwidth] = useState("82px");
  const [height, SetHeight] = useState("82px");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading } = useFetch("/movie/upcoming");
  const [randomData, setRandomData] = useState(null);
  const { url } = useSelector((state) => state.home);
  const { myListArr } = useSelector((state) => state.mylist);
  const [right, setRight] = useState("-250px");
  const[showVideoModal,setShowVideoModal] = useState(false);
  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
    let a = data?.data?.results?.[Math.floor(Math.random() * 20)];
    setRandomData(a);
    let bg = url.backdrop + a?.backdrop_path;
    setBackground(bg);
  }, [data]);
  // console.log(randomData)
  const { data: moviedata } = useFetch(`/movie/${randomData?.id}`);
  const { data:videoData} = useFetch(`/movie/${randomData?.id}/videos`);
  const video =videoData?.data?.results?.filter((video)=> video.name=="Official Trailer")
  const myListObj = {
    mediaType: "movie",
    id: `${randomData?.id}`,
    poster_path: moviedata?.data?.poster_path,
    genres: moviedata?.data?.genres,
    title: moviedata?.data?.title,
    name: moviedata?.data?.name,
    vote_average: moviedata?.data?.vote_average,
    release_date: moviedata?.data?.release_date,
  };
 
  const myListArrstring = JSON?.stringify(myListArr)
  localStorage.setItem('myListArr',myListArrstring);
  const Arrstring = localStorage.getItem("myListArr");
  const Arraydata = JSON?.parse(Arrstring);
  const ab = Arraydata?.find((list) => list.id === myListObj.id);

  function AddedOrNot() {
    if (ab) {
      setClicked(true);
    } else {
      setClicked(false);
    }
  }
  useEffect(() => {
    AddedOrNot();
  }, [randomData]);

  const handleAddToList = () => {
    setClicked(clicked ? false : true);

    if (clicked) {
      dispatch(remove(myListObj.id));
    } else if (clicked === false) {
      dispatch(addToList(myListObj));
    }
    setRight("20px");
    setTimeout(() => {
      setRight("-250px");
    }, 2500);
  };
  const handlechnage = (fn) => {
    setScreenWidth(window.innerWidth);
    fn();
  };

  const setdimension = () => {
    if (screenWidth >= 768) {
      SetHeight(height);
      Setwidth(width);
    } else {
      SetHeight("65px");
      Setwidth("65px");
    }
  };
  // console.log(height,width)
  useEffect(() => {
    window.addEventListener("resize", () => handlechnage(setdimension));

    return () => {
      window.removeEventListener("resize", () => handlechnage(setdimension));
    };
  }, [screenWidth]);

  return (
    <div className="w-full ">
      <div className="w-full h-[450px] bg-[rgba(15,16,20)] min-[768px]:h-[700px] relative flex justify-center items-center ">
        {!loading && (
          <div className="h-[450px ] w-full min-[768px]:h-[700px]  absolute top-0 left-0  opacity-[0.5] overflow-hidden ">
            <Img
              className=" h-[450px] w-full min-[768px]:h-[700px] transition-all ease-in-out duration-300  bg-cover bg-center"
              src={background}
            />
          </div>
        )}
        <div className=" opacitylayer w-full h-[250px] absolute bottom-0 left-0"></div>
        {moviedata && (
          <div
            id="Circlerating"
            className="flex items-center gap-[10px]  min-[768px]:gap-[25px] mt-[20px] mb-[20px] z-[2] absolute bottom-5 "
          >
            <VscInfo className="  text-white text-[50px] min-[768px]:text-[57px] min-w-[100px] w-full hover:text-[rgba(67,137,216)] cursor-pointer" onClick={()=>navigate(`/movie/${randomData?.id}`)}/>
            
            <div
              id="play"
              className="flex items-center gap-[10px] min-[768px]:gap-[20px] cursor-pointer"
              onClick={()=>{setShowVideoModal(true),setVideoId(video?.[0].key)}}
            >
              <Playbtn height={height} width={width} />
             
            </div>

            <div className="flex overflow-hidden flex-wrap  justify-center items-center gap-[10px] cursor-pointer min-w-[99px] min-[768px]:min-w-[123px] w-full ">
              <VscAdd
                className={`font-[900] text-[30px] min-[768px]:text-[40px] transition-[transform] duration-500 ease-in-out text-white ${
                  clicked ? "rotate-[135deg] hover:text-red-600" : ""
                } hover:text-[rgba(67,137,216)]`}
                onClick={handleAddToList}
              />
              <span className="text-[16px] text-white  min-[768px]:text-[20px] transition-colors ease-in duration-500 ">
                {clicked ? "Remove" : "Add"}
              </span>
            </div>
          </div>
        )}
        <div
          id="toast-success"
          className="flex fixed bottom-0   items-center w-full max-w-[250px] p-3 mb-4   rounded-lg shadow text-gray-400 bg-gray-800 z-10 transition-[right] duration-500 ease-[cubic-bezier(0.88,-0.35,0.565,1.35)] "
          role="alert"
          style={{ right }}
        >
          <div
            className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8  rounded-lg ${
              clicked
                ? "bg-green-800 text-green-200"
                : "bg-red-800 text-red-200"
            } `}
          >
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
            {randomData?.original_title}{" "}
            {clicked ? "added to my list" : "removed from my list"}
          </div>
        </div>
       
      </div>
      {showVideoModal&&<VideoModal setShowVideoModal={setShowVideoModal} videoId={videoId}/>}
    </div>
  );
}
