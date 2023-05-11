import React, { useEffect, useState } from "react";
import useFetch from "../Hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Img from "../Components/Img";
import Rating from "../Components/Rating";
import Genre from "../Components/Genre";
import dayjs from "dayjs";  
import noposter from "../assets/no-poster.png"
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../Components/Spinner";
import { fetchData } from "../Api";





export default function SearchResult({num}) {
  const [loading , setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [nextdata, setNextdata] = useState(null)
  const [pageNum, setPageNum] = useState(1)
  const { query } = useParams();
  const navigate = useNavigate()
  
  const {url} = useSelector((state)=>state.home)
  // console.log(data)
  const Search =data?.data?.results
  const skeleton = () => {
    return (
      <div className="w-[125px] min-[768px]:w-[calc(25%-15px)] lg:w-[calc(20%-16px)] shrink-0 ] ">
        {/* <div className="rounded-[12px] w-full aspect-[1/1.5] mb-[30px] skeleton  "></div> */}
        <div className="flex flex-col">
          <div className="w-full h-[20px] mb-[10px] skeleton "></div>
          <div className="w-[75%] h-[20px] skeleton animate-pulse"></div>
        </div>
      </div>
    );
  };
  
  const fetchInitialPage=()=>{
    setLoading(true)
    fetchData(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res)=>{
        setData(res)
        setLoading(false)
        setPageNum((prev)=>prev+1)
      })
  }

//   fetchData(`/search/multi?query=${query}&page=${pageNum}`).then(
//     (res)=>{
      
//  const m =       {
//           ...data?.data,
//              results:[...data?.data?.results,...res?.data?.results]
//         };
//         setNextdata(m)
//     //  console.log(m)
//     })
//     // console.log(nextdata)
//     setData(nextdata)
  const fetchNextPage=()=>{
    
    fetchData(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res)=>{
        let meta =data?.data?.results
        
        if(meta){
       let a = {
            ...data?.data,
            // results:data?.data?.results.concat(res?.data?.results)
            results:[...data?.data?.results,...res?.data?.results]
          };
          setData(a)
          setNextdata(a)
          
        }else{
          setData(res?.data)
        }
        setPageNum((prev)=>prev+1);
      })
    }
    
  // console.log(nextdata)
    useEffect(() => {
      setPageNum(1);
      navigate(`/search/${query}`)
      fetchInitialPage();
  }, [query]);
  console.log(data)
  // const info =  data?.results||data?.data?.results
  const info = nextdata?data?.results:data?.data?.results
  const infodata = nextdata?data:data?.data
//  info?.map((item,index)=>console.log(item?.poster_path + index))
  return (
    
    <div className="max-w-[1200px] w-full px-[20px] mx-auto min-[768px]:pt-[120px]  pt-[60px] mb-[60px]">
      {loading&&<Spinner/>}
      {!loading ? (<> 
           <div className="text-white text-[18px] mb-[15px]">{`Showing  ${info?.length<=1?"result":"results"} for "${query}" `}</div>
          <div
            
            className="w-full h-full  px-[20px] min-[768px]:m-0 min-[768px]:p-0 mx-auto "
          >
              {/* {info?.length>0 ?( */}
              <InfiniteScroll
              className="flex gap-[20px] justify-center w-full flex-wrap min-[768px]:gap-[20px] min-[768px]:overflow-hidden  items-center h-full mb-[20px] min-[768px]:mb-[50px] px-[20px] min-[768px]:m-0 min-[768px]:p-0"
              dataLength={infodata?.length ||[]}
              next={fetchNextPage}
              hasMore={pageNum<=infodata?.total_pages}
              loader={<Spinner />}
              >
              {info?.map((item) => {
                const postUrl = item?.poster_path
                  ? url.backdrop + item?.poster_path
                  : noposter;
                return (
                  <div
                    key={item.id}
                    className="w-[calc(48%-10px)]   cursor-pointer shrink-0 min-[768px]:w-[calc(25%-15px)] lg:w-[calc(20%-16px)] h-full py-[10px] hover:scale-[1.02] duration-200 ease-linear "
                    onClick={() =>
                      navigate(`/${item?.media_type || endpoint}/${item?.id}`)
                    }
                  >
                    <div className="w-full h-full aspect-[1/1.5] mb-[20px] relative  flex items-end justify-between ">
                      <Img
                        src={postUrl}
                        className="rounded-[12px] h-full  w-full top-0 left-0 overflow-hidden bg-center object-center object-cover "
                      />
                      <div className="flex justify-between">
                      {item?.vote_average&&<Rating classCarousel=" bg-white absolute bottom-[-15px]  left-[20px]  h-[43px] w-[43px] min-[768px]:w-[53px] min-[768px]:h-[53px] flex justify-center items-center max-[768px]:hidden" rating={item?.vote_average?.toFixed(1)} />}
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
                      <span className="text-[13px] opacity-[0.5]">
                        {dayjs(item?.release_Date).format("D MMM, YYYY")}
                      </span>
                    </div>
                  </div>
                  
                  );
                })}
                </InfiniteScroll>
                {/* :(<div className=" w-full text-[25px] text-white font-medium text-center"> {`sorry no results found for "${query}"`}
                </div>) */}
                {/* } */}
          </div></>):
          (<div className="flex gap-[10px] overflow-y-hidden  mx-[-20px] px-[20px] min-[768px]:gap-[20px] min-[768px]:overflow-hidden min-[768px]:m-0 min-[768px]:p-0">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>)}
          
    </div>
     ); 
}
