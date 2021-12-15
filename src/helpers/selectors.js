export function getAppointmentsForDay(state, day){
  const currentDay = state.days.filter((ele) => ele.name === day )[0];
  if(!currentDay){ 
    return [];
  }
  const result = [];
  for(let key of currentDay.appointments){
    result.push(state.appointments[String(key)]);
  }
  return result;
}

export function getInterview(state, interview){
  if(!interview){
    return null;
  }
  let interviewer = null; 
  for(let key in state.interviewers){
    if(state.interviewers[key].id === interview.interviewer){
      interviewer = state.interviewers[key];
    }
  }
  if(!interviewer){
    return null;
  }
  return {
    student: interview.student,
    interviewer: interviewer
  }
}

export function getInterviewersForDay(state, day){
  
  const currentDay = state.days.filter((ele) => ele.name === day )[0];
  if(!currentDay){ 
    return [];
  }
  const result = [];
  for(let key of currentDay.interviewers){
    result.push(state.interviewers[String(key)]);
  }
  return result;
}