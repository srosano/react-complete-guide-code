import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput
    } = useInput(value => value.trim() !== '');
    // anomous arrow function not executed here but defined here
    // Which is then passed to use-input

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput
  } = useInput(value => /\S+@\S+\.\S+/.test(value));

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }

    console.log(enteredName);
    console.log(enteredEmail);

    resetNameInput();
    resetEmailInput();
  };

  const nameInputClasses = nameInputHasError ? "form-control invalid" : "form-control";

  const emailInputClasses = emailInputHasError ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" onBlur={nameBlurHandler} onChange={nameChangeHandler} value={enteredName} />
        {nameInputHasError && <p className="error-text">Name must not be empty</p>}
      </div>

      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input type="email" id="email" onBlur={emailBlurHandler} onChange={emailChangeHandler} value={enteredEmail} />
        {emailInputHasError && <p className="error-text">Email must not be empty</p>}
      </div>

      <div className="form-actions">
        { !formIsValid ? <button disabled>Submit</button> : <button>Submit</button> }
      </div>
    </form>
  );
};

export default SimpleInput;
