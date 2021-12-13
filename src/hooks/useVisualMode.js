import React, {useState} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if(!replace) {
      setHistory(history => [...history, newMode]);
      setMode(newMode);
    } else {
      setHistory(history => {
        history.pop();
        history.push(newMode);
        setMode(newMode);
        return history;
      })
    }
  }

  function back(){
    if(history.length > 1){
      setHistory(history => {
        history.pop();
        setMode(history[history.length - 1]);
        return history;
      });
    }
  }
  return { mode, transition, back }
}