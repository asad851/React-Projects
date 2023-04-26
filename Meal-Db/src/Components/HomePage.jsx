import { Link } from "react-router-dom";
import AppContext from "../central/AppContext";
import { useContext } from "react";
import Pages from "./Pages";

export default function HomePage() {
  const context = useContext(AppContext)
   
    //  const defaultPage = async()=>{const defaultData = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)}
  
    
  return (
    <>
      <div className="flex flex-wrap   justify-center p-3 mt-[100px]  max-sm:mt-[40px]   ">
      {context.currentPosts?.map((d,index) => ( 
        <div className="max-w-[250px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700  mx-2 mb-6" key={index}>
          <Link to="/Recipe">
            <img className="rounded-t-lg  " src={d.strMealThumb} alt="" onClick={()=>context.handleReadMore(index)} />
          </Link>
          <div className="p-2">
            <Link to="/Recipe">
              <h5 className="mb-1 h-[32px] overflow-hidden text-2xl font-bold tracking-tight text-gray-900 dark:text-white" onClick={()=>context.handleReadMore(index)}>
                {d.strMeal}
              </h5>
            </Link>
            <p className="mb-1 font-normal overflow-hidden h-[75px] text-gray-700 dark:text-gray-400">
              {d.strInstructions}
            </p>
            <Link
              to="/Recipe"
              type="button"
              onClick={()=>context.handleReadMore(index)}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                aria-hidden="true"
                className="w-4 h-4 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
        
      ))}</div>
     <Pages/>
      
     
    </>
  )
}
