import { fetchData } from "../Api";
import { useState,useEffect } from "react";



export default function useFetch(url) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)
    
    useEffect(()=>{
         setLoading('loading...')
         setError(null);
         setData(null);
       fetchData(url)
        .then((res)=>{
           setData(res);
           setLoading(false);
       })
        .catch((err)=>{

            console.log(err);
            setLoading(false)
            setError('Something went wrong!')
        })
    },[url])

  return (
    {data,loading,error}
  )
}