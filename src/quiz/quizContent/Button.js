import React from 'react'
import {useContext} from 'react';
import quizContext from '../../Context/quizContext.js';

const Button = () => {
    const {setStarted,setReseted}=useContext(quizContext);

    function start(){
        setStarted(true)
        setReseted(false)
      }
  return (
    <button onClick={start} className="start">Start</button>
  )
}

export default Button