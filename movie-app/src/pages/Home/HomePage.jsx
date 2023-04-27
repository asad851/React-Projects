import React from 'react'
import HeroBanner from './HeroBanner'
import Trending from './Trending'

export default function HomePage() {
  return (
    <div className='h-[1400px]'>
    <HeroBanner/>
    <Trending/>
    </div>
  )
}
