import React from 'react'
import Carousel from '..//..//Components/Carousel'
import useFetch from '../../Hooks/useFetch'
function Similar({mediaType,id}) {
    const {data,loading}=useFetch(`/${mediaType}/${id}/similar`)
    const title = mediaType==="movie"?"Similar Movies":"similar Tv series"
    // console.log(data)
  return (<div>
   {data?.data?.total_results!=0&& <Carousel data={data?.data?.results} endpoint={mediaType} loading={loading} title={title}/>}
   </div>
  )
}

export default Similar