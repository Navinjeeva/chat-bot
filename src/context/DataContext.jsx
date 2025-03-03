import { createContext, useState } from "react";
import React from 'react';
import run from './../config/api'

export const DataContext= createContext({});

export const DataProvider = (props) => {

    const [input,setInput] = useState("");
    const [recentPrompt,setRecentPrompt] = useState("");
    const [prevPrompts,setPrevPrompts] = useState([]);
    const [showResult,setShowResult] = useState(false);
    const [loading,setLoading]= useState(false);
    const [resultData,setResultData]= useState("");

    const delay = (index,nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev+nextWord);
        },75*index)
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    const onSend = async(prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        if(prompt !== undefined){
            response = await run(prompt);
            setRecentPrompt(prompt);
        }
        else{    
            response = await run(input);  
            setRecentPrompt(input);
            setPrevPrompts(prev => [...prev,input]);        
        }     
        let responseArray=response.split("**");
        let newResponse="";
        for(let i = 0; i<responseArray.length; i++){
            if(i===0 || i%2 ===0){          //zero and even numbers
                newResponse += responseArray[i];
            }
            else{
                newResponse += "<b>"+responseArray[i]+"</b>";
            }
        }
        let newResponse2 =  newResponse.split('*').join("<br>");
        let newResponseArray=newResponse2.split(" ");
        for(let i = 0; i<newResponseArray.length; i++){        
                let nextWord = newResponseArray[i];
                delay(i,nextWord+" ");
        }
        setLoading(false);
        setInput("");
    }


    const contextValue={ 
        input,setInput,recentPrompt,setRecentPrompt,prevPrompts,setPrevPrompts,
        showResult,setShowResult,loading,setLoading,resultData,setResultData,onSend,newChat
    }

    return(
        <DataContext.Provider value={contextValue}>
            {props.children}
        </DataContext.Provider>
    )
}


export default DataContext;