import React, { useEffect,useState } from 'react'
import {fetchData} from './Api'
import { useDispatch } from "react-redux"
import {getApiConfig, getGenre} from './store/homeSlicer'
import { Routes,Route } from 'react-router-dom'

import HomePage from './pages/Home/HomePage'
import Details from './pages/Details/Details'
import SearchResult from './pages/SearchResult'
import Explore from './pages/Explore'
import PageNotFound from './pages/PageNotFound'
import Header from './Components/Header'
import Footer from './Components/Footer'

  
  
  function App(props) {
    const dispatch = useDispatch()
    const testApi =()=>{
      fetchData("/configuration")
          .then((res)=>{
            const url = {
              backdrop: res.data.images?.secure_base_url + "original",
              poster: res.data.images?.secure_base_url + "original",
              profile: res.data.images?.secure_base_url + "original",
            }
            dispatch(getApiConfig(url))
           
          })
        }
        
    useEffect(() => {
      testApi()
      handleGenre()
    }, [])
     document.body.style.backgroundColor="rgb(15, 16, 20)"
     
     const handleGenre = async() =>{
      const genreData = []
      const mediaType = ["movie","tv"]
      const allgenre = {}
      mediaType.forEach((url)=>{
        genreData.push(fetchData(`/genre/${url}/list`))
      })
      const data = await Promise.all(genreData)
      data?.map((g)=>{
        return g?.data?.genres?.map((item)=>{allgenre[item.id]=item})
        
      })
      
       dispatch(getGenre(allgenre))
     }
     
     
  return (
    <>
    <Header /> 
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/:mediaType/:id' element={<Details/>} />
      <Route path='/search/:query' element={<SearchResult   />} />
      <Route path='/explore/:mediaType' element={<Explore/>} />
      <Route path='*' element={<PageNotFound/>} />
    </Routes>
    <Footer/>
      
    </>
  )
}

export default App
