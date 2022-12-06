
//import { decode } from "html-entities"

export default function SingleQuestion(props){

    function clickAnswer(answer, currentQuestion){
        props.groupQuestionAndAnswer(currentQuestion, answer)
    }

const answerElement = props.shuffledAnswers.map((answer, index) => {
    return (
      <button
         key={index}
         onClick={()=> clickAnswer(answer, props.question)} 
         className={`answer-btn${answer===props.selectedAnswer ? "selected":""}
                               ${props.showResult && answer===props.selectedAnswer && answer === props.correctAnswer ? "correct": ""}
                               ${props.showResult && answer!==props.correctAnswer&& answer!==props.selectedAnswer ? "dimmed": ""}
                               ${props.showResult && answer===props.correctAnswer ? "correct": ""}
         `}
         disabled={props.showResult}
      >
        {answer}
    </button>
    )
})
return (
    <div className="container">
        <p className="question-text"><b>{props.question}</b></p>
        <div className="answer-btn-container">{answerElement}</div>
    </div>
)
}