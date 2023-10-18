import useBasicInput from "../hooks/use-basic-input";

const BasicForm = (props) => {
  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    hasError: firstnameInputHasError,
    valueChangeHandler: firstnameChangeHandler,
    inputBlurHandler: firstnameBlurHandler,
    reset: resetFirstNameInput,
  } = useBasicInput((value) => value.trim() !== "");

  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastnameInputHasError,
    valueChangeHandler: lastnameChangeHandler,
    inputBlurHandler: lastnameBlurHandler,
    reset: resetLastNameInput,
  } = useBasicInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useBasicInput((value) => /\S+@\S+\.\S+/.test(value));

  let formIsValid = false;

  if (enteredFirstNameIsValid && enteredLastNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    // Stop the form submit button from reloading the page
    event.preventDefault();

    if (!enteredFirstNameIsValid || !enteredLastNameIsValid || !enteredEmailIsValid) {
      return;
    }

    console.log(enteredFirstName);
    console.log(enteredLastName);
    console.log(enteredEmail);

    resetFirstNameInput();
    resetLastNameInput();
    resetEmailInput();
  };

  const firstnameInputClasses = firstnameInputHasError ? "form-control invalid" : "form-control";
  const lastnameInputClasses = lastnameInputHasError ? "form-control invalid" : "form-control";
  const emailInputClasses = emailInputHasError ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="control-group">
        <div className={firstnameInputClasses}>
          <label htmlFor="name">First Name</label>
          <input type="text" id="name" onBlur={firstnameBlurHandler} onChange={firstnameChangeHandler} value={enteredFirstName} />
          {firstnameInputHasError && <p className="error-text">First Name must not be empty</p>}
        </div>
        <div className={lastnameInputClasses}>
          <label htmlFor="name">Last Name</label>
          <input type="text" id="name" onBlur={lastnameBlurHandler} onChange={lastnameChangeHandler} value={enteredLastName} />
          {lastnameInputHasError && <p className="error-text">Last Name must not be empty</p>}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input type="text" id="name" onBlur={emailBlurHandler} onChange={emailChangeHandler} value={enteredEmail} />
        {emailInputHasError && <p className="error-text">Email must not be empty</p>}
      </div>
      <div className="form-actions">{!formIsValid ? <button disabled>Submit</button> : <button onClick={formSubmissionHandler}>Submit</button>}</div>
    </form>
  );
};

export default BasicForm;
