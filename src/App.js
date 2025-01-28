import React, { useRef, useState } from "react";

import QuizMain from "./quiz/quizMain/QuizMain.js";
import QuizContext from "./Context/quizContext.js";


function App() {

  const [questionsData,setquestionsData]=useState([]);
  const [userResponses,setUserResponses]=useState(Array(questionsData.length).fill(0));
  const [clicked,setClicked]=useState(false);
  const [score,setScore]=useState(0);
  const [started,setStarted]=useState(false);
  const [reseted,setReseted]=useState(false);

  const [sec,setSec]=React.useState(120);
  const [timerId, setTimerId] = React.useState(null);

  const ref=useRef(null);
  
  const properties={
    questionsData,setquestionsData,
      userResponses,setUserResponses,
      clicked,setClicked,score,setScore,started,setStarted,
      reseted,setReseted,sec,setSec,
      timerId,setTimerId,ref
  }
  
  return (
    <QuizContext.Provider value={properties}>
        <QuizMain />
    </QuizContext.Provider>
  );
}

export default App;