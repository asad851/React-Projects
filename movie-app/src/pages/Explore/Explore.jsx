import React, { useEffect, useState } from "react";
import { fetchApiData } from "../../utils/getApi";
import InfiniteScroll from "react-infinite-scroll-component";
import useFetch from "../../Hooks/useFetch";
import { useParams } from "react-router-dom";
import GenresModal from "../genresModal";
import Spinner from "../../Components/Spinner";

import { useSelector } from "react-redux";
import Img from "../../Components/Img";
import Rating from "../../Components/Rating";
import Genre from "../../Components/Genre";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { BsFillCaretDownFill } from "react-icons/bs";
import { VscChromeClose } from "react-icons/vsc";
import {AiOutlineCloseCircle} from "react-icons/ai"

export default function Explore() {
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const { mediaType } = useParams();
  const [pageNum, setPageNum] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [genre, setGenre] = useState("");
  const [genreName, setGenreName] = useState("");
  let filters = { with_genres: genre };
  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

  const skeleton = () => {
    return (
      <div className="w-[125px] min-[768px]:w-[calc(25%-15px)] lg:w-[calc(20%-16px)] shrink-0 ] ">
        <div className="rounded-[12px] w-full aspect-[1/1.5] mb-[30px] skeleton  "></div>
        <div className="flex flex-col">
          <div className="w-full h-[20px] mb-[10px] skeleton "></div>
          <div className="w-[75%] h-[20px] skeleton animate-pulse"></div>
        </div>
      </div>
    );
  };

  const fetchInitialPage = () => {
    setLoading(true);
    fetchApiData(`/discover/${mediaType}`, filters).then((res) => {
      setLoading(false);
      setData(res);
      setPageNum((prev) => prev + 1);
    });
  };
  const fetchNextPage = () => {
    fetchApiData(`/discover/${mediaType}?page=${pageNum}`, filters).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res?.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };
  useEffect(() => {
    setPageNum(1);
    setGenre("");
    setData(null);
    fetchInitialPage();
  }, [mediaType]);

  useEffect(() => {
    fetchInitialPage();
  }, [genre]);

  if (showModal === true) {
    const scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;
    document.body.style.overflow = "hidden";
    window.scrollTo(0, scrollPosition);
  } else {
    document.body.style.overflow = "auto";
  }

  return (
    <div className="max-w-[1200px] h- full w-full px-[20px] mx-auto min-[768px]:pt-[120px]  pt-[60px] mb-[60px]">
      {showModal && (
        <GenresModal
          data={genresData?.data?.genres}
          setShowModal={setShowModal}
          setGenre={setGenre}
          setGenreName={setGenreName}
        />
      )}
      {loading && <Spinner />}
      {!loading ? (
        <>
          <div className="w-full h-full  px-[20px] min-[768px]:m-0 min-[768px]:p-0 mx-auto ">
            <div
              onClick={() => setShowModal(true)}
              className="flex max-[768px]:justify-end items-center mb-[15px] min-[768px]:mb-[25px] text-white gap-[2px] text-[15px] min-[768px]:text-[20px] font-medium cursor-pointer mt-[15px]"
            >
              Genre{" "}
              <BsFillCaretDownFill className="min-[768px]:text-[15px] text-[10px]  mt-[5px]" />
            </div>

            <div className="flex gap-[5px] items-center  min-[768px]:justify-between">
              {genre && (
                <div className="text-white text-[15px] flex flex-wrap min-[768px]:text-[20px] my-[5px] min-[768px]:my-[10px] font-medium"><span>showing results for </span><span>"{genreName}"</span></div>
              )}
              {genre && (
                <div className="pb-[5px] flex max-[768px]:flex-col  bg-slate-900  h-[20px]   rounded-[8px] max-w-[120px] min-[768px]:max-w-[175px] items-center w-full relative">
                  <span className=" text-white text-[12px] min-[768px]:text-[15px]  inline-block absolute left-[10px] ">
                    {genreName}
                  </span>
                  <AiOutlineCloseCircle className="text-white text-[13px] min-[768px]:text-[15px] cursor-pointer inline-block absolute right-[15px] max-[768px]:top-[3px] " onClick={()=>setGenre(null)} />
                </div>
              )}
            </div>
            <InfiniteScroll
              className="flex gap-[20px] justify-center w-full flex-wrap min-[768px]:gap-[20px] min-[768px]:overflow-hidden  items-center h-full mb-[20px] min-[768px]:mb-[50px] px-[20px] min-[768px]:m-0 min-[768px]:p-0"
              dataLength={data?.results || []}
              next={() => fetchNextPage()}
              hasMore={pageNum <= data?.total_pages}
              loader={<Spinner />}
            >
              {data?.results?.map((item) => {
                const postUrl = item?.poster_path
                  ? url.backdrop + item?.poster_path
                  : noposter;
                return (
                  <div
                    key={item.id}
                    className="w-[calc(48%-10px)]   cursor-pointer shrink-0 min-[768px]:w-[calc(25%-15px)] lg:w-[calc(20%-16px)] h-full py-[10px] hover:scale-[1.02] duration-200 ease-linear "
                    onClick={() =>
                      navigate(`/${item?.media_type || mediaType}/${item?.id}`)
                    }
                  >
                    <div className="w-full h-full aspect-[1/1.5] mb-[20px] relative  flex items-end justify-between ">
                      <Img
                        src={postUrl}
                        className="rounded-[12px] h-full  w-full top-0 left-0 overflow-hidden bg-center object-center object-cover "
                      />
                      <div className="flex justify-between">
                        {item?.vote_average && (
                          <Rating
                            classCarousel=" bg-white absolute bottom-[-15px]  left-[20px]  h-[43px] w-[43px] min-[768px]:w-[53px] min-[768px]:h-[53px] flex justify-center items-center max-[768px]:hidden"
                            rating={item?.vote_average?.toFixed(1)}
                          />
                        )}
                        <Genre
                          classNamecarousel="flex-col absolute bottom-[20px] right-[20px] hidden justify-end min-[912px]:flex  flex-wrap  "
                          data={item?.genre_ids?.slice(0, 2)}
                        />
                      </div>
                    </div>
                    <div className="flex text-white flex-col ">
                      <span className="text-[16px] text-white  mb-[10] leading-[24px] min-[768px]:text-[20px] truncate">
                        {item?.title || item?.name}
                      </span>
                      {item?.release_date||item?.first_air_date ? (
                        <span className="text-[13px] opacity-[0.5]">
                          {dayjs(item?.release_date||item?.first_air_date).format("D MMM, YYYY")}
                        </span>
                      ) : (
                        <span className="text-[13px] opacity-[0.5]">
                          date unknown {console.log(item)}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </InfiniteScroll>
            {/* :(<div className=" w-full text-[25px] text-white font-medium text-center"> {`sorry no results found for "${query}"`}
                </div>) */}
            {/* } */}
          </div>
        </>
      ) : (<div className="w-full h-full  px-[20px] min-[768px]:m-0 min-[768px]:p-0 mx-auto">
        <div className="flex  gap-[10px] w-full flex-wrap  mx-[-20px] px-[20px] min-[768px]:gap-[20px]  min-[768px]:m-0 min-[768px]:p-0">
          {skeleton()}
          {skeleton()}
          {skeleton()}
          {skeleton()}
          {skeleton()}
        </div>
        </div>
      )}
    </div>
  );
}
