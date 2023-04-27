import { useState } from "react"
import Game from "./components/Game"


function App() {
  const [playAgain, setPlayAgain] = useState(true)

  return (
   <>
   {playAgain&&<Game setPlayAgain={setPlayAgain}/>}
   </>
  )
}

export default App
