import axios from "axios";
const BASE_URL = 'https://api.themoviedb.org/3'
// const TOKEN = import.meta.env.MOVIE_TOKEN
const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmU5MzM1Yjg5Y2E3NWE3MGJjY2UxYzcyYmZkMDQ4ZCIsInN1YiI6IjYzYmVkN2FiODU4Njc4MDBmMDhjZjI3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sQHes_rn51wewxY_7nZLxGssnd67J8ieiLOIo2Bg_FI"



const headers ={
    Authorization : 'bearer ' + TOKEN,
}
export const fetchApiData = async(url,params)=>{
    try{
      const {data} = await axios.get(BASE_URL + url ,{
        headers,
        params
      })
      return data;
    }catch(err){
        console.log(err);
        return err;
    }
}