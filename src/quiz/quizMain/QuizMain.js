import React from 'react'
import {useEffect,useContext} from 'react';
import QuizContent from '../quizContent/QuizContent.js';
import CountDown from '../Time/CountDown.js';
import QuizContext from '../../Context/quizContext.js';
const QuizMain = () => {

  const {setquestionsData,sec,clicked,ref,userResponses,setScore}=useContext(QuizContext);

  useEffect(()=>{
    const getQuestionsdata=async ()=>{
      const data=await fetch("./questions.json");
      const response= await data.json()
      setquestionsData(response)
    }
      getQuestionsdata()
    },[])

    useEffect(()=>{
            if (clicked || (Math.floor(sec/60)===0 && sec===0)) {
              ref.current.style.display="block"
              setquestionsData((prevData) => {
                return prevData.map((item) => {
                  const correctAnswer = item.answers.find((a) => a.iscorrect);
                  const updatedAnswers=item.answers.map((it) => {
                    if(it.checked) {
                      it.style = it.iscorrect ? "blue" : "tomato";
                    }
                    else if (!it.checked && it.iscorrect) {
                      correctAnswer.style = "blue";
                    }
                    
                    return it;
                  });
                  return { ...item, answers: updatedAnswers };
                });
              });
              const totalCorrect = userResponses.reduce((a, b) => a + b, 0);
              setScore(totalCorrect)
            }
            
          },[clicked,sec,userResponses])

  return (
    <div>
      <QuizContent />
      <CountDown />
    </div>
  )
}

export default QuizMain;