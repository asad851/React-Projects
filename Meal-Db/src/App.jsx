import HomePage from "./Components/HomePage";
import Navbar from "./Components/Navbar";
import SearchedPage from "./Components/SearchedPage";
import { useContext } from "react";
import AppContext from "./central/AppContext";
import AppState from "./central/AppState";
import Recipe from "./Components/Recipe";
import { Routes,Route } from "react-router-dom";
function App() {
 const context = useContext(AppContext)
  
  return (
    <>
   <AppState>
   <Navbar />
   <Routes>
   <Route path="/" element={<HomePage/>}/>
   {/* <Route path ="/SearchedPage" element={<SearchedPage/>}/> */}
   <Route path="/Recipe" element={ <Recipe/>}/>
   </Routes>
   </AppState>
    </>
  )
}

export default App;
