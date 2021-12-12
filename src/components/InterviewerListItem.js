import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem (props) {
  const interviewer = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected === true,
    "interviewers__item :hover": props.hover
    
  });
  let name = "";
  if(props.selected){
    name = props.name;
  }



  return (
    <li className={interviewer} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}