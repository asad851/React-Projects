import React from 'react'
import Carousel from '../../Components/Carousel'
import useFetch from '../../Hooks/useFetch'
function Recommendation({media,id}) {
    const {data,loading} =useFetch(`/${media}/${id}/recommendations`)
    const title = media==="movie"?"Recommended Movies":"Recommended Tv Series"
  return (<>
   {data?.data?.total_results!=0&& <Carousel data={data?.data?.results} loading={loading} title={title}/>}
   </>
  )
}

export default Recommendation