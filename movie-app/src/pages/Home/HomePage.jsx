import React from 'react'
import HeroBanner from './HeroBanner'
import Trending from './Trending'
import Popular from './Popular'
import TopRated from './TopRated'
import Anime from './Anime'

import Comedies from './Comedies'
import Family from './Family'

export default function HomePage() {
 
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
