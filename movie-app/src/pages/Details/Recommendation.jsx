import React from 'react'
import Carousel from '../../Components/Carousel'
import useFetch from '../../Hooks/useFetch'
function Recommendation({media,id}) {
    const {data,loading} =useFetch(`/${media}/${id}/recommendations`)
    const title = media==="movie"?"Movies Recommendation":"Tv Series Recommendation"
  return (<>
   {data?.data?.total_results!=0&& <Carousel data={data?.data?.results} loading={loading} title={title}/>}
   </>
  )
}

export default Recommendation