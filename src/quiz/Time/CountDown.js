import React from 'react'
import {useContext} from 'react';
import QuizContext from '../../Context/quizContext.js';


const CountDown = () => {

    const {sec,setSec,clicked,started,setTimerId}=useContext(QuizContext)

    React.useEffect(()=>{
        let intervalId;
        if(!clicked && started){
          intervalId = setInterval(() => {
            if (sec > 0) {
              setSec(sec - 1);
            } 
          }, 1000);
          setTimerId(intervalId);
         } 
        
        return () => clearInterval(intervalId);
       },
       [sec,clicked,started])
    
    const mins = Math.floor(sec / 60);
    const remainingSeconds = sec % 60;
    return (
        <h2 className="time"> {mins}:{remainingSeconds < 10 ? '0' : ''}{remainingSeconds}</h2>
    )
}

export default CountDown;