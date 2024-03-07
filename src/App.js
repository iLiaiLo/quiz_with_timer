import React, { useRef, useState } from "react";
import { useEffect } from "react";


function App() {


  //initial values
  const [questionsData,setquestionsData]=useState([]);
  const [userResponses,setUserResponses]=useState(Array(questionsData.length).fill(0))
  const [clicked,setClicked]=useState(false);
  const [score,setScore]=useState(0);
  const [started,setStarted]=useState(false);
  const [reseted,setReseted]=useState(false);

  const [sec,setSec]=React.useState(120);
  //const [mins,setMins]=React.useState(Math.floor(num/60))
  const [timerId, setTimerId] = React.useState(null);

  const ref=useRef(null);

//fetch data from json file
  useEffect(()=>{
    getQuestionsdata()
  },[])

  async function getQuestionsdata(){
    const data=await fetch("./questions.json");
    const response= await data.json()
    setquestionsData(response)
  }

//useEffect for countdown timer
  React.useEffect(()=>{
    let intervalId;
    if(!clicked && started){
      intervalId = setInterval(() => {
        if (sec > 0) {
          setSec(sec - 1);
        } 
      }, 1000);
      setTimerId(intervalId);
     } // Store the timer ID in the state
    

    return () => clearInterval(intervalId);
   },
   [sec,clicked,started])

   const mins = Math.floor(sec / 60);
   const remainingSeconds = sec % 60;

   
   
 //useEffect to find out correct and wrong answers after clicking or time waste
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

//click function to find out sum of all correct results
  function clcl(){
    setClicked(true);
    clearInterval(timerId)
    const totalCorrect = userResponses.reduce((a, b) => a + b, 0);
    console.log("Total correct responses:", totalCorrect);
    ref.current.style.display="block";
  }
// to start quiz
  function start(){
    setStarted(true)
    setReseted(false)
  }

//to assign styles and scores to element and score array
  function handleClick(id,key){
    setquestionsData(questionsData.map((item)=>{
        item.answers.map(it=>{
        if(item.key===key){
          if(it.id===id){
          it.checked=true
          it.style="blue"
          if(it.iscorrect){
            setUserResponses((prevResponses) => {
              const newResponses = [...prevResponses];
              newResponses[item.key] = 1;
              return newResponses;
            });
          }
          else{
            setUserResponses((prevResponses) => {
              const newResponses = [...prevResponses];
              newResponses[item.key] = 0;
              return newResponses;
            });
          }
        }
          else{
          it.checked=false;
          it.style="lightgreen";
        }
      }
        return it
      })
      return item
    }))
  }

//what will happen after "reseted button" click
  useEffect(()=>{
    if(reseted){
      setquestionsData(prewdata=>{
        return prewdata.map(item=>{
          const initialanswers=item.answers.map(it=>{
            it.style="lightgreen";
            it.checked=false;
            return it;
          })
          return {...item,answers:initialanswers};
        })
      })
    }
  },[reseted])
// everything has been reseted
  function reset(){
    //getQuestionsdata();
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
    <div>
        <div className="container">
        <button onClick={start} className="start">Start</button>
        {questionsData.map(item=>{
          return(
                <article className="questionContent" key={item.key}>
                <h1 className="question">{item.question}</h1>

            {item.answers.map(ans=>{
              return(
               <button key={ans.id} onClick={()=>handleClick(ans.id,item.key)} disabled={!started}
               className="answers"
               style={{background:ans.style}}>{ans.answer}</button>
               )
            })
            }
          </article>)
        })
      }
      <div className="reset-finish">
      <button  onClick={clcl}>Finish</button>
      <button onClick={reset}>Reset</button>
      </div>
      <h1 ref={ref} className="result" style={{display:"none"}}>
      <div>Your score is {score} from {questionsData.length}</div>
      </h1>
      </div>
      <h2 className="time"> {mins}:{remainingSeconds < 10 ? '0' : ''}{remainingSeconds}</h2>
      
      </div>

  );
}

export default App;
