import React from "react";

import "./Backdrop.css";

const backdrop = (props) => {
    console.log("Backdrop", props);
    const cssClasses= ["Backdrop", props.show ? "BackdropOpen" : "BackdropClosed"]

  return <div className={cssClasses.join(" ")}></div>;
};

export default backdrop;
