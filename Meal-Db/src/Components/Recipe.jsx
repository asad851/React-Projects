import React, { useState } from 'react'
import AppContext from '../central/AppContext'
import { useContext,useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';


import HomePage from './HomePage'


export default function Recipe(props) {
    const context = useContext(AppContext)
    const input = context.input
    const index=context.details
    const [data, setData] = useState([])
    
   
   async function getApi(){
      const datas= await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
      const foodArr=datas.data.meals
      let data;
      // const data = datas.data.meals[index];
     index===''?data=foodArr[Math.floor(Math.random()*foodArr.length)]:data=foodArr[index]
      setData(data)
    }
     
    useEffect(() => {
      getApi()
    }, [])
    
   
  return (
    <>
     <div className=' mt-8'>
        <h1 className='text-4xl font-bold text-black text-center mb-4 underline max-sm:text-lg '>{data.strMeal}</h1>
    <div className='flex justify-center  align-middle'>
        <img className='w-[1000px] h-[500px] rounded-lg shadow-lg max-sm:h-[250px] mx-2' src={data.strMealThumb} alt={data.strMeal} />
    </div>
    <h3 className='text-center max-sm:text-[18px] text-3xl text-slate-700 mt-5'>Category : {data.strCategory} | Place of Origin : {data.strArea}</h3>
    <h2 className='text-2xl max-sm:text-[18px] text-slate-900 mt-4 ml-3 max-sm:ml-2'>Ingredients Required :</h2>
    <ol className='ml-[35px] mt-4 text-xl max-sm:text-sm list-decimal'>
        <li>{data.strIngredient1}</li>
        <li>{data.strIngredient2}</li>
        <li>{data.strIngredient3}</li>
        <li>{data.strIngredient4}</li>
        <li>{data.strIngredient5}</li>
        <li>{data.strIngredient6}</li>
        <li>{data.strIngredient7}</li>
        <li>{data.strIngredient8}</li>
        <li>{data.strIngredient9}</li>
        {data.strIngredient10&&<li>{data.strIngredient10}</li>}
        {data.strIngredient11&&<li>{data.strIngredient11}</li>}
        {data.strIngredient12&&<li>{data.strIngredient12}</li>}
        {data.strIngredient13&&<li>{data.strIngredient13}</li>}
        {data.strIngredient14&&<li>{data.strIngredient14}</li>}
        {data.strIngredient15&&<li>{data.strIngredient15}</li>}
        {data.strIngredient16&&<li>{data.strIngredient16}</li>}
        {data.strIngredient17&&<li>{data.strIngredient17}</li>}
        {data.strIngredient18&&<li>{data.strIngredient18}</li>}
        {data.strIngredient19&&<li>{data.strIngredient19}</li>}
        {data.strIngredient20&&<li>{data.strIngredient20}</li>}
    </ol>
    <p className='indent-8 mx-4 mt-4'> {data.strInstructions}</p>
    <h3 className='ml-5 text-lg mt-4 font-medium'>To watch it on Yotube <a className='text-cyan-800 font-bold text-xlg' href={data.strYoutube} target='_blank'>click</a></h3>
  </div>
    
    </>
  )
}
