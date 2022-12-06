
import './App.css';
import { useEffect, useState } from 'react';
import SingleQuestion from './SingleQuestion';

export default function Quiz() {
  //question returned from trivia API
  const [triviaData, setTriviaData] = useState([]);
  //mapping each question & its answer
  const [questionAndAnswer, setQuestionAndAnswer] = useState([]);
  //points according to correct answers
  const [currentPoints, setCurrentPoints] = useState(0);
  //show result 
  const [showResult, setShowResult] = useState(false);
  //show warning if not all questions are answered
  const [warning, setWarning] = useState(false)
  const [loading, setLoading] = useState(true)

  //Make api call to trivia api
  useEffect(() => {
    //Set loading boolean to true so that we know to show loading text
    if(triviaData.length===0){
   // const resp = await axios.get("https://opentdb.com/api.php?amount=1");
    fetch("https://opentdb.com/api.php?amount=5&category=21&type=multiple")
        .then((response => response.json()))
        .then((data) => {
           setTriviaData(data.results)
        
      setQuestionAndAnswer(
        data.results.map((questionObject) => {
        return{
            question: questionObject.question,
            shuffledAnswers: shuffle([...questionObject.incorrect_answers,
                                         questionObject.correct_answer]),
            correctAnswer: questionObject.correct_answer,
            selectedAnswer: ""
        }
        
        })
      )
      })
    }
    //Set loading boolean to false so that we know to show trivia question
    
  }, [questionAndAnswer])
  //A function to shuffle an array
  function shuffle(array){
    let currentIndex = array.length, randomIndex;
        while(currentIndex !== 0){
          randomIndex = Math.floor(Math.random()* currentIndex)
             currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
        }
    return array
  }
//Group each question to its possible set of answers
  function groupQuestionAndAnswer(currentQuestion, answer){
         setQuestionAndAnswer(
          questionAndAnswer.map((questionObject) => {
              return questionObject.question === currentQuestion ?
                     {...questionObject, selectedAnswer: answer}: questionObject;
          
         })
         )
  }
  function checkAnswers() {
    const answerAll = questionAndAnswer.some(
      (questionObject) => questionObject.selectedAnswer === ""
    )

    setWarning(answerAll)

    if(!answerAll){
      questionAndAnswer.forEach((questionObject) => {
        return questionObject.selectedAnswer === questionObject.correctAnswer ? 
        setCurrentPoints(prevPoint => prevPoint + 1): ""
      })
      setShowResult(true)
    }
  }

  function playAgain() {
    setTriviaData([]);
    setQuestionAndAnswer([]);
    setCurrentPoints(0);
    setShowResult(false);
    setWarning(false)
  }

  const questionElement = questionAndAnswer.map((questionObject, index)=> {
    return (
            <SingleQuestion
              key={index}
              question={questionObject.question}
              shuffledAnswers={questionObject.shuffledAnswers}
              correctAnswer={questionObject.correctAnswer}
              selectedAnswer={questionObject.selectedAnswer}
              showResult={showResult}
              groupQuestionAndAnswer={groupQuestionAndAnswer}
            />
    )
  })

  return (
    <div>
      {triviaData.length ===0 && (<p>Questions Loading...</p>)}
      <div className="questions-container">{questionElement}</div>

      <div className="text-center">
        {warning && (
          <p className="warning-message">
            There are questions not answered yet^
          </p>
        )}

        {/* questions.length > 0 means showing the button when the data is available */}
        {triviaData.length > 0 && !showResult ? (
          <button className="check-btn" onClick={checkAnswers}>
            Check answers
          </button>
        ) : null}
      </div>

      {showResult && (
        <div className="result-container">
          <p className="result-message">
            You scored {currentPoints}/5 correct answers
          </p>
          <button className="play-again-btn" onClick={playAgain}>
            Play again
          </button>
        </div>
      )}
    </div>
  )
  }
