import React from 'react'
import {useContext,useEffect} from 'react';
import QuizContext from '../../Context/quizContext.js';

const ResetAndFinish = () => {

    const {userResponses,ref,setClicked,
        timerId,setReseted,setUserResponses,
        questionsData,setScore,
        setSec,setTimerId,setStarted,reseted,setquestionsData}=useContext(QuizContext);

        useEffect(()=>{
            if(!reseted) return;
        
            setquestionsData(prewdata=>{
                return prewdata.map(item=>{
                  const initialanswers=item.answers.map(it=>{
                    return {...it,style:"lightgreen",checked:false};
                  })
                  return {...item,answers:initialanswers};
                })
            })
        
          },[reseted])
    
      const clcl=()=>{
        setClicked(true);
        clearInterval(timerId)
        const totalCorrect = userResponses.reduce((a, b) => a + b, 0);
        console.log("Total correct responses:", totalCorrect);
        ref.current.style.display="block";
      }


      const reset=()=>{
        setReseted(true)
        setUserResponses(Array(questionsData.length).fill(0));
        setClicked(false);
        setScore(0);
        setSec(120);
        setTimerId(null);
        setStarted(false);
        ref.current.style.display="none";
        window.scrollTo(0,0);
      }
  return (
    <section className="reset-finish">
      <button  onClick={clcl}>Finish</button>
      <button onClick={reset}>Reset</button>
    </section>
  )
}

export default ResetAndFinish