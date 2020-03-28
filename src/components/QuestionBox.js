/* We are using 'useState' as we are passing state to a function */
import React,{ useState }from "react";

//Passing props to function.
const QuestionBox = ({ question, options,selected}) => {
    /* Creating a state variable answer,using useState function and setting initial value
        of answer variable from the options array
       */ 
    const [answer,setAnswer] = useState(options);
    return(
        <div className="questionBox">
            <div className="question">{question}</div>
            {answer.map((text,index)=>(
                <button key ={index} className="answerBtn" onClick={() =>{
                    setAnswer([text]);
                    selected(text);
                }}>
                    {text}
                </button>
            ))}
        </div>
    );
}

export default QuestionBox;