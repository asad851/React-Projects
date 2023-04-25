import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SlMenu } from "react-icons/sl";
import { HiOutlineSearch } from "react-icons/hi";
import { VscChromeClose } from "react-icons/vsc";
import icon from "../assets/Tvpedia.svg";
import {Drawer} from 'flowbite'

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [navShow, setNavshow] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setshowSearch] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const [query, setQuery] = useState("");

  const openSearch = (e) => {
    setshowSearch(true);
    setShowMobileMenu(false);
    
  };

  const openMenu = () => {
    setShowMobileMenu(true);
    setshowSearch(false);
   
  };
  const navigateTo = (type) => {
    // if (type === "movie") {
    //   navigate("/explore/movie");
    // } else {
    //   navigate("/explore/tv");
    // }
    navigate(`explore/${type}`);
    // setshowSearch(false);
    setShowMobileMenu(false);
  };
  const searchQueryHandler = (e) => {
    e.preventDefault();
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setshowSearch(false)
      }, 1000);
    }
  };
  function handleScreenSizeChange() {
    var windowWidth = window.innerWidth;
    if (windowWidth >768) {
      setShowMobileMenu(false)
    } else {
     return
    }
  }
    
  window.addEventListener('resize', handleScreenSizeChange);
 
  
  return (
    <header
      className={` w-full flex justify-between items-center h-[60px] px-[20px] fixed transform 
     translate-y-0 transition-all delay-[0.15s] ease-linear z-[2] backdrop-blur-[3.5px] ${showMobileMenu?'flex-col bg-[#04152d]':' bg-[rgba(0,0,0,0.25)]'}`}
    >
      <div>
        <img
          onClick={() => navigate("/")}
          className={`w-[150px] cursor-pointer ${showMobileMenu?'absolute top-[-45px] left-[20px]':''} ` }
          src={icon}
        />
      </div>
      <ul id="drawer-top-example" className={`flex  items-center  text-[15px] min-[768px]:text-[18px] font-semibold text-white max-[768px]:hidden gap-[10px] min-[768px]:gap-[25px] `}>
        <li className={`cursor-pointer  `} onClick={() => navigateTo("movie")}>
          Movies
        </li>
        <li className={`cursor-pointer `} onClick={() => navigateTo("tv")}>
          TvSeries
        </li>
        <li className={`cursor-pointer `}>
          {<HiOutlineSearch onClick={openSearch} className="font-semibold" />}
        </li>
      </ul>
      {
       showMobileMenu&&
       <div className="  transition-all delay-[0.5s] ease-linear w-full fixed top-[60px] border-t-[1px] min-[768px]:hidden border-t-white">
       <ul id="drawer-top-example" className={`flex flex-col items-center  text-[15px] min-[768px]:text-[18px] font-semibold text-white   bg-[#04152d] w-full divide-y-[1px] divide-white `}>
       <li className={`cursor-pointer  h-[40px] w-full flex justify-center items-center`} onClick={() => navigateTo("movie")}>
         Movies
       </li>
       <li className={`cursor-pointer h-[40px]  w-full flex justify-center items-center`} onClick={() => navigateTo("tv")}>
         TvSeries
       </li>
       <li className={`cursor-pointer  h-[40px] w-full flex justify-center items-center`}>
         {<HiOutlineSearch onClick={openSearch} className="font-semibold" />}
       </li>
     </ul>
     </div>
      }
      <div className="min-[768px]:hidden text-white flex items-center">
        <HiOutlineSearch onClick={openSearch} className="mr-[20px] absolute top-[22px] right-[50px]"/>
        {showMobileMenu ? (
          <VscChromeClose onClick={() => setShowMobileMenu(false)} className={`${showMobileMenu?"absolute right-[20px] top-[20px] ":""}`} />
        ) : (
          <SlMenu onClick={openMenu}  />
        )}
        
      </div>
      
      {showSearch && (
        <div className="w-full flex items-center justify-center absolute top-[70px]">
          <input
            className=" h-[35px] min-[768px]:h-[50px]  w-[calc(100%-100px)] min-[768px]:w-[calc(100%-150px)] rounded-[35px] text-slate-700 focus:outline-none focus:border-none text-[14px] pl-[20px]"
            type="search"
            name=""
            id=""
            placeholder="Movies, shows and more..."
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={searchQueryHandler}
          />
        </div>
      )}
     </header>
    
   
   

  );
};
export default Header;
