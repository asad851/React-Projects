import React, { useEffect } from 'react'
import {fetchData} from './Api'
import { useDispatch } from "react-redux"
import {getApiConfig} from './store/homeSlicer'
import { Routes,Route } from 'react-router-dom'

import HomePage from './pages/Home/HomePage'
import Details from './pages/Details'
import SearchResult from './pages/SearchResult'
import Explore from './pages/Explore'
import PageNotFound from './pages/PageNotFound'

  
  
  function App() {
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
    }, [])

  return (
    <>
      
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/:mediaType:id' element={<Details/>} />
      <Route path='/search:query' element={<SearchResult/>} />
      <Route path='/explore/:mediaType' element={<Explore/>} />
      <Route path='*' element={<PageNotFound/>} />


    </Routes>
      
    </>
  )
}

export default App
