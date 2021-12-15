import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from 'prop-types';
function InterviewerList(props) {
  let interviewerItems = props.interviewers.map((obj) => 
    <InterviewerListItem 
      key={obj.id} 
      avatar={obj.avatar} 
      name={obj.name} 
      setInterviewer={() => props.onChange(obj.id)}
      selected={obj.id === props.value}/>
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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;