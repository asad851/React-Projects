import React from 'react'

function mediaCard() {
  return (
    <> 
        <div className="text-white text-[18px] mb-[15px]">{`Showing  ${info?.length<=1?"result":"results"} for "${query}" `}</div>
       <div
         
         className="w-full h-full  px-[20px] min-[768px]:m-0 min-[768px]:p-0 mx-auto "
       >
           {/* {info?.length>0 ?( */}
           <div
           className="flex gap-[20px] justify-center w-full flex-wrap min-[768px]:gap-[20px] min-[768px]:overflow-hidden  items-center h-full mb-[20px] min-[768px]:mb-[50px] px-[20px] min-[768px]:m-0 min-[768px]:p-0">
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
                   {item?.release_date?<span className="text-[13px] opacity-[0.5]">
                     {dayjs(item?.release_date).format("D MMM, YYYY")}
                   </span>:<span className="text-[13px] opacity-[0.5]">date unknown</span>}
                 </div>
               </div>
               
               );
             })}
             </div>
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
       </div>)
  )
}

export default mediaCard