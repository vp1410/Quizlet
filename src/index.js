/* This is the root file of application */
 
import React,{ Component }from "react";
import ReactDOM from "react-dom";//To install webpack
import "./assets/style.css";
import quizQuestions from "./quizQuestions";
import QuestionBox from "./components/QuestionBox";
import Result from "./components/Result";

/* Create root component Quizlet */
class Quizlet extends Component{
    //Instantiating an array,state is always defined to the nearest parent.
    state ={
        questionBank:[],
        score: 0,
        responses: 0
    };
    //Function to invoke quizQuestions api
    getQuestions = () =>{
        quizQuestions().then(question =>{
            this.setState({
                questionBank:question
            });
        });
    };
    //Checking whether user's answer is correct
    computeAnswer = (answer,correctAnswer) =>{
        if(answer === correctAnswer){
            this.setState({
                score:this.state.score + 1
            });
        }
        this.setState({
            responses:this.state.responses < 5 ? this.state.responses + 1 : 5
        });
    };
    playAgain = () => {
        this.getQuestions();//get new set of questions
        this.setState({//setting value as O for score and responses
            score:0,
            responses:0
        });
    };
    //We need a function to get data from api, so we make use of componentDidMount
    componentDidMount(){
        this.getQuestions();
    }
    render(){
        return(
            <div className="container">
                <div className="title">Quizlet</div>
                {this.state.questionBank.length > 0 && 
                    this.state.responses < 5 &&
                    this.state.questionBank.map(
                    ({question,answers,correct,questionId})=>(
                        <QuestionBox 
                            question={question}
                            options={answers}
                            key={questionId}//Essential property when we are rendering a list.
                            selected={answer =>this.computeAnswer(answer,correct)}
                        />
                    )
                    )}
            {this.state.responses === 5 ? (<Result score = {this.state.score} playAgain={this.playAgain} />) : null}
            </div>
        );
    }
}

ReactDOM.render(<Quizlet />,document.getElementById("root"));
