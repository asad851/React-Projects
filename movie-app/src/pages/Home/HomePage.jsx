import React from 'react'
import HeroBanner from './HeroBanner'
import Trending from './Trending'
import Popular from './Popular'
import TopRated from './TopRated'
import Anime from './Anime'
import { useSelector } from 'react-redux'
import Comedies from './Comedies'
import Family from './Family'

export default function HomePage() {
  const{genre} =useSelector((state)=>state.home)
  console.log(genre)
  return (
    <div className=''>
    <HeroBanner/>
    <Trending/>
    <Popular/> 
    <Anime/>
    <Comedies/>
    <Family/>
    <TopRated/>
    
    </div>
  )
}
