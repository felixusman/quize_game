
import React from 'react'
import './App.css'
import Quiz from './Quiz'

export default function App() {
  const [quiz, setQuiz] = React.useState(false)

  function startQuiz(){
     setQuiz(!quiz)
  
  }
  return (
    <div className="App">
      <header className="App-container">
      <main className="main-content">
       
        {!quiz ? <div><h2>Knowledge Box</h2><h4>Challange your self!!</h4>
        <button className="start-button" onClick={startQuiz}>Start Game</button></div>:<div><Quiz />
       </div> }
      </main>
      </header>
    </div>
  );
}


