import React from "react";

const Result = ({score,playAgain}) => (
    <div className="score-board">
        <div className="score"> Your score is : {score} </div>
        <button className="playBtn" onClick={playAgain}>Play again ! </button>
    </div>
);
export default Result;