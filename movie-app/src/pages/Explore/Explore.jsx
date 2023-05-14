import React, { useEffect, useState } from 'react'
import { fetchData } from '../../Api'
import InfiniteScroll from 'react-infinite-scroll-component'
import useFetch from '../../Hooks/useFetch'
import { useParams } from 'react-router-dom'
import GenresModal from "../genresModal"



export default function Explore() {
  const {mediaType} =useParams()
  const [pageNum, setPageNum] = useState(1)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [genre, setGenre] = useState("")
  const filters={with_genre:genre}
  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);
  
  const fetchinitialPage=()=>{
    setLoading(true)
    fetchData(`/discover/${mediaType}`,filters).then((res)=>{
       setLoading(false)
       setData(res)
       setPageNum((prev)=>prev+1)
    })
  }
  // console.log(genresData?.data?.genres)
  return (
    <div className='pt-[120px]'>
      <GenresModal data={genresData?.data?.genres} setShowModal={setShowModal} setGenre={setGenre}/>
      <div className='text-white'>this is a explore page</div>
    </div>
  )
}
