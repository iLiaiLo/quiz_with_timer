import React from 'react'
import {useContext} from 'react';
import QuizContext from '../../Context/quizContext.js';

const QuestionData = () => {
    const {questionsData,started,setquestionsData,setUserResponses}=useContext(QuizContext)

    function handleClick(id,key){
        setquestionsData(questionsData.map((item)=>{
    
            item.answers.map(it=>{
    
            if(item.key===key){
    
              if(it.id===id){
    
              it.checked=true;
              it.style="blue";
    
              if(it.iscorrect){
                setUserResponses((prevResponses) => {
                  prevResponses[item.key]=1;
                  return prevResponses
                });
              }
              else{
                setUserResponses((prevResponses) => {
                  prevResponses[item.key]=0;
                  return prevResponses;
                });
              }
    
            }
              else{
              it.checked=false;
              it.style="lightgreen";
            }
    
          }
            return it;
        })
          return item;
        }))
      }
  return (
    <>
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
    </>
  )
}

export default QuestionData