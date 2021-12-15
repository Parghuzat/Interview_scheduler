import {useState, useEffect} from "react";
import axios from "axios";

export function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });
  function bookInterview(id, interview) {
    const apiEndpoint = "/api/appointments/" + id;
    return axios.put(apiEndpoint, {interview})
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        setState({
          ...state,
          appointments
        });
        updateSpots();
      })
  }

  function deleteAppointment(id){
    const apiEndpoint = "/api/appointments/" + id;
    return axios.delete(apiEndpoint)
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: null
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        setState({
          ...state,
          appointments: appointments
        });
        updateSpots();
      })
  }

  function updateSpots(){
    axios.get('/api/days')
    .then((response) => {
      setState(prev => ({...prev, days: response.data,}));
    });
  }

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data})); 
    });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    deleteAppointment
  }
}