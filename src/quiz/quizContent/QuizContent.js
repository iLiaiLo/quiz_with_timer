import React from 'react'
import Button from './Button.js'
import QuestionData from './QuestionData.js'
import ResetAndFinish from './ResetAndFinish.js'
import Result from './Result.js'

const QuizContent = () => {
  return (
    <div className="container">
        <Button />
        <QuestionData />
        <ResetAndFinish />
        <Result />
    </div>
  )
}

export default QuizContent