import { useState } from "react";
import Modal from "./Modal";
import rock from "../assets/6-61708_rock-rock-paper-scissors-clipart.png";
import paper from "../assets/paper.png";
import scissor from "../assets/Scissor.png";

export default function Game(props) {
  const [player, setPlayer] = useState("");
  const [computer, setComputer] = useState("");
  const [won, setWon] = useState("");
  const [play, setPlay] = useState(0);
  const [score, setScore] = useState(0);
  const [modal, setModal] = useState(true);
  const [winner, setWinner] = useState("");

  const options = ["Rock", "Paper", "Scissor"];

  function handleClick(move) {
    let computerChoice = options[Math.floor(Math.random() * options.length)];
    setPlayer(move);
    setComputer(computerChoice);
    setPlay(play + 1);
    WonOrLost(move, computer);
  }

  function WonOrLost(player, computer) {
    if (player === computer) {
      setWon("It is a draw!");
    } else if (
      (player === "Rock" && computer === "Scissor") ||
      (player === "Paper" && computer === "Rock") ||
      (player === "Scissor" && computer === "Paper")
    ) {
      setWon("Congratulation You won");
      setScore(score + 1);
    } else {
      setWon("Computer won");
    }

    if (score >= 2) {
      setWinner("Congratulations You won The Game!");
    } else {
      setWinner("You Lost the Game");
    }
  }

  return (
    <>
      <div className="flex bg-slate-200 justify-center absolute top-0 bottom-0 left-0 right-0">
        <div className='max-w-md p-10 bg-white border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 max-h-[500px] m-auto'>
            <h1 className="text-center font-bold text-slate-800 text-2xl">Best out of Three rounds</h1>

          <button
            className="rounded-[10px]  w-[120px]"
            onClick={() => handleClick("Rock")}
          >
            
            <img  className="mix-blend-hard-light active:scale-90 ease-in  px-2" src={rock}></img>
          </button>
          <button
            className="rounded-[10px] w-[120px]"
            onClick={() => handleClick("Paper")}
          >
            <img className="mix-blend-hard-light active:scale-90 ease-in  px-2 h-[94px]" src={paper}></img>
          </button>
          <button
            className="rounded-[10px] w-[120px]"
            onClick={() => handleClick("Scissor")}
          >
            <img className="mix-blend-hard-light active:scale-90 ease-in  px-2 h-[94px]" src={scissor}></img>
          </button>

          <h1 className="text-center font-bold text-slate-800 text-2xl"> Score:{score} </h1>

          
          <h1 className="text-center font-bold text-slate-800 text-2xl">Result:{won}</h1>
          {modal && play === 3 && (
            <Modal won={winner} score={score} setModal={setModal} setPlayAgain={props.setPlayAgain} />
          )}
        </div>
      </div>
    </>
  );
}
