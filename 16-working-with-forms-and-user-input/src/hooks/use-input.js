import react, { useState, useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if(action.type === 'INPUT'){
    // isTouched: state.isTouched is using the previous states value
    return { value: action.value, isTouched: state.isTouched }
  }
  if(action.type === 'BLUR'){
    // value: state.value is using the previous states value
    return { value: state.value, isTouched: true }
  }
  if(action.type === 'RESET'){
    return { value: "", isTouched: false }
  }
  return initialInputState;
};

// Receives a function as value validateValue this value is true or false
const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);

  // const [enteredValue, setEnteredValue] = useState("");
  // const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({type: 'INPUT', value: event.target.value});
    // setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    dispatch({type: 'BLUR'});
    // setIsTouched(true);
  };

  const reset = () => {
    dispatch({type: 'RESET'});
    // setEnteredValue("");
    // setIsTouched(false);
  };

  return {
    value: inputState.enteredValue,
    isValid: valueIsValid,
    hasError: hasError,
    valueChangeHandler: valueChangeHandler,
    inputBlurHandler: inputBlurHandler,
    reset: reset,
  };
};
export default useInput;
