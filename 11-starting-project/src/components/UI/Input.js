import React from "react";
// import classes from './Meals.module.css';
import classes from "./Input.module.css";

const Input = React.forwardRef((props,ref) => {
    // console.log(props.input.id);
  return (
    <div className={classes.input}>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input ref={ref} {...props.input}/>
    </div>
  );
});

export default Input;
