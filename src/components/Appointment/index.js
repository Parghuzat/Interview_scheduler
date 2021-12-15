import React from 'react';
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

export default function Appointment (props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const SAVING_ERR = "SAVING_ERR";
  const DELETING_ERR = "DELETING_ERR";
  const { mode, transition, back, } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    if(!interviewer){
      transition(SAVING_ERR);
      return;
    }
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      }).catch(() => {
        transition(SAVING_ERR);
      });
  }

  function onDelete(){
    transition(CONFIRM);
  }

  function confirmDelete(){
    transition(DELETING);
    props.deleteAppointment(props.id)
    .then(() => {
      transition(EMPTY);
    })
    .catch(() => {
      transition(DELETING_ERR);
    });
  }  

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => {
        transition(CREATE);
      }} />}
      {mode === SHOW && (
        <Show
          onEdit={() => { transition(EDIT)}} 
          onDelete={onDelete}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status message="Saving" />
      )}
      {mode === CONFIRM && (
        <Confirm 
          onCancel={() => back()}
          onConfirm={confirmDelete} 
        />
      )}
      {mode === DELETING && (
        <Status message="Deleting" />
      )}
      {mode === EDIT && (
        <Form 
          onCancel={() => back()}
          onSave={save}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
        />
      )}
      {mode === SAVING_ERR && (
        <Error 
          message="Could not save appointment."
          onClose={() => back()}
        />
      )}
      {mode === DELETING_ERR && (
        <Error 
          message="Could not delete appointment."
          onClose={() => back()}
        />
      )}
    </article>
  );
}