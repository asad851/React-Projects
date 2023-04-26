import React,{ useState,useEffect } from "react";
import AppContext from "./AppContext";
import axios from "axios";




const AppState = (props)=>{
    const [data,setData]=useState([])
    const [input, setInput] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [details, setDetails] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(8)
    
   
    async function fetching() {
        try{
        const datas = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
        const data = datas.data.meals
        setData(data)
        } catch(error){
          setErrMsg('Zero match found!')
          setData('')
        console.log(error)
      }
    
    }
    const page = Math.ceil(data?data.length/8:1)
    
  
        console.log(page)

      const handleClick=async()=>{
        
         await fetching()
         if(page===1){
          setCurrentPage(page)
        }

      
        }
        
      const handleReadMore=(index)=>{
        
        window.scrollTo(0,0)
        setDetails(index);
        
        
        }  
        const next =(e)=>{
          e.preventDefault()
        if(currentPage>=page){
          setCurrentPage(1)
          }else{
            setCurrentPage(currentPage+1)
          }
        
          
          
         
        }
        const previous =(e)=>{
          e.preventDefault()
         if(currentPage<=1){
            setCurrentPage(page)
          }else{
            setCurrentPage(currentPage-1)
          }
              
        }
           
        
         const lastPostIndex = currentPage * postPerPage
         const firsPostIndex = lastPostIndex - postPerPage
         const currentPosts = data?.slice(firsPostIndex,lastPostIndex)
       
      useEffect(() => {
       fetching();

      }, []);
        
      
      
   return(
  <AppContext.Provider value={{data,setInput,handleClick,handleReadMore,input,details,currentPosts,setCurrentPage,next,previous,currentPage,page}}>
    {props.children}
  </AppContext.Provider>
   )
}

export default AppState