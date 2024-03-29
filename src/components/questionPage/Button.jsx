import React from "react";
import questionPage from "./questionPage.css";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";

function Button(props) {
  // const iconMap = {
  //   next: GrLinkNext,
  //   previous: GrLinkPrevious,

  //   // Add more icon mappings as needed
  // };
  // const SelectedIcon = iconMap[props.iconName];
  return (
    <div
      className="question-page-content__submit"
      style={{ backgroundColor: props.color && `${props.color}` }}
    >
      <div> {props.name}</div>
      {/* <SelectedIcon /> */}
    </div>
  );
}

export default Button;
