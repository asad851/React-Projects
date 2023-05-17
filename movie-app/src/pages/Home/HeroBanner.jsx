import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import Img from "../../Components/Img";
import useFetch from "../../Hooks/useFetch";
import { useNavigate } from "react-router-dom";
import Playbtn from "../Details/Playbtn";
import { VscAdd } from "react-icons/vsc";
import {VscInfo} from "react-icons/vsc"



export default function HeroBanner() {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data, loading } = useFetch("/movie/upcoming");
  const [randomData, setRandomData] = useState(null);
  const { url } = useSelector((state) => state.home);
  const {myListArr} =useSelector(state=>state.mylist)
  

  useEffect(() => {
    let a= data?.data?.results?.[Math.floor(Math.random() * 20)];
    setRandomData(a)
    let bg = url.backdrop + a?.backdrop_path;
    setBackground(bg);
  }, [data]);
  // console.log(randomData)
  const { data: moviedata } = useFetch(`/movie/${randomData?.id}`);
  console.log(moviedata)
  const searchQueryHandler = (e) => {
    e.preventDefault();
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  const handleSubmit = () => {
    if (query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

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
        {/* <div
          id="Circlerating"
          className="flex items-center justify-start gap-[15px] mt-[20px] mb-[20px]"
        >
          <Rating
            className="max-w-[70px] max-h-[70px] bg-[rgba(10,10,14)] min-[768px]:max-w-[90px] min-[768px]:max-h-[90px] flex justify-center items-center fill-white   "
            rating={moviedata?.data?.vote_average.toFixed(1)}
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
        </div> */}
        {/* <div className="w-full my-0 py-0 mx-auto px-[20px] ">
          <div className="flex justify-center items-center flex-col text-white mx-auto max-w-[800px]  relative">
            <span className="text-[50px] min-[768px]:text-[90px]   font-bold mb-[10px]">
              Welcome
            </span>
            <span className="text-[18px] min-[768px]:text-[24px]   font-bold mb-[40px]">
              Millions of movies and tv shows to discover
            </span>
            <form
              action=""
              className="w-full flex items-center"
              onSubmit={handleSubmit}
            >
              <input
                className=" h-[35px] min-[768px]:h-[50px]  w-[calc(100%-100px)] min-[768px]:w-[calc(100%-150px)] rounded-tl-[35px] rounded-bl-[35px] text-slate-700 outline-none border-none text-[14px] pl-[20px]"
                type="search"
                name=""
                id=""
                placeholder="Movies, shows and more..."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <button className="w-[100px] min-[768px]:w-[150px] rounded-tr-[35px] rounded-br-[35px] bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl h-[35px] min-[768px]:h-[50px] text-[16px] font-medium">
                Search
              </button>
            </form>
          </div>
        </div> */}
      </div>
    </div>
  );
}
