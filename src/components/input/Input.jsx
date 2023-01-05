import React from "react";
import "./input.scss";

const Input = (props) => {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange ? (event) => props.onChange(event) : null}
    />
  );
};

export default Input;
