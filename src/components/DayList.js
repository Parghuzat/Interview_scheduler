import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  let dayListItems = props.days.map((obj) => 
    <DayListItem key={obj.id} name={obj.name} spots={obj.spots} setDay={props.setDay} selected={obj.name === props.day}/>
    );
  
return (
  <ul>
     {dayListItems}
  </ul>
 
)
};