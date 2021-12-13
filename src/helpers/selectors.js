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