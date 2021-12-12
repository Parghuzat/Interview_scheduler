import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {
  let interviewerItems = props.interviewers.map((obj) => 
    <InterviewerListItem key={obj.id} avatar={obj.avatar} id={obj.id} name={obj.name} setInterviewer={props.setInterviewer} selected={obj.id === props.interviewer}/>
    );
  
return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">
      {interviewerItems}
    </ul>
  </section>

 
)
};