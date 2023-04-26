import React from 'react'
import { useContext,useState } from 'react';
import AppContext from '../central/AppContext';

 function Pages() {
    const context = useContext(AppContext)
    let data = context.data
    let length = data?data.length:1
    let page =[];
    for(let i=1; i<=Math.ceil(length/8); i++){
      page.push(i)
    }
    
   
    
  return (
    <>
    <nav  className="flex justify-center   mx-auto mb-3 shrink" aria-label="Page navigation example  " >
  <ul className="inline-flex -space-x-px  ">
    <li>
      <button  className="px-3 mt-[-10px]  max-sm:px-2 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"   onClick={context.previous}>Previous</button>
    </li>
   {page.map((pg,index)=>(
    
    <li key={index}>
      <button className="px-3 mt-[-10px] max-sm:px-2 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white active:text-blue-600 active:bg-blue-50" onClick={(e)=>(context.setCurrentPage(pg),e.preventDefault())}>{pg}</button>
    </li>
  
   ))}
   
    <li>
      <button className="px-3 mt-[-12px] max-sm:px-2 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={context.next} >Next</button>
    </li>
  </ul>
</nav>
<p className='text-sm text-gray-500 text-center max-[400px]:mt-2 mb-3  sm:ml-2'>{context.currentPage} out of {page.length} pages</p>

    </>
  )
}

export default Pages;