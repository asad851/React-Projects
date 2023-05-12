import React from 'react'
import Carousel from '..//..//Components/Carousel'
import useFetch from '../../Hooks/useFetch'
function Similar({media,id}) {
    const {data,loading}=useFetch(`/${media}/${id}/similar`)
    const title = media==="movie"?"Similar Movies":"similar Tv shows"
    console.log(data)
  return (<div>
   {data?.data?.total_results!=0&& <Carousel data={data?.data?.results} loading={loading} title={title}/>}
   </div>
  )
}

export default Similar