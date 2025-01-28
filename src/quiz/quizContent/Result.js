import React from 'react'
import {useContext} from 'react';
import QuizContext from '../../Context/quizContext.js';

const Result = () => {
  const {ref,questionsData,score}=useContext(QuizContext);
  return (
    <h1 ref={ref} className="result" style={{display:"none"}}>
      <div>Your score is {score} from {questionsData.length}</div>
    </h1>
  )
}

export default Result