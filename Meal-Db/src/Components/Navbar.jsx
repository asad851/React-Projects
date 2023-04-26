import React from "react";
import { useContext } from "react";
import AppContext from "../central/AppContext";
import { Link } from "react-router-dom";
import logo from '../assets/LOGO.png'


export default function Navbar() {
  const context = useContext(AppContext)
  return (
    <>
      
        <div className="flex align-middle flex-col max-w-full relative ">
          <div className="flex relative align-middle justify-start pt-2 bg-[rgba(255,255,255)] h-[70px] shadow-lg max-sm:h-[40px]"  >
            {/* <h1 className="font-bold text-lg text-black font-sans pl-2"> */}
              <Link  to="/"><img className ="w-[250px] ml-4 absolute top-[-80px] max-sm:w-[150px] max-sm:top-[-48px]" src={logo} alt="" /></Link>
            {/* </h1> */}
          </div>
          <div className="flex justify-center sticky ">
            <form className="flex items-center w-[800px]  mt-20 max-sm:mt-5 " >
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full ">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                
                <input
                  type="text"
                  id="simple-search"
                  onChange={(e)=>context.setInput(e.target.value)}
                  value={context.input}
                  onKeyDown={()=>(context.handleClick())}
                  className= " bg-gray-50 border border-gray-300 text-gray-900 text-lg max-sm:text-sm font-semibold rounded-[12px] focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 max-sm:py-0.5   max-[230px]:text-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  placeholder="Search"
                  
                />
                
              </div>
              <Link to="/">
              <button
                type="button"
                onClick={()=>context.handleClick()}
                className="p-2.5 ml-2 max-sm:p-1.5 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-5 h-5 max-sm:w-4 max-sm:h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
                <span className="sr-only">Search</span>
              </button>
              </Link>
            </form>
          </div>
        </div>
     
    </>
  );
}
