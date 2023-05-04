import React from 'react'
import HeroBanner from './HeroBanner'
import Trending from './Trending'
import Popular from './Popular'
import TopRated from './TopRated'

export default function HomePage() {
  return (
    <div className=''>
    <HeroBanner/>
    <Trending/>
    <Popular/>
    <TopRated/>
    
    </div>
  )
}
