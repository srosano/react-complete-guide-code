import React, { useState,useCallback,useMemo } from "react";
import DemoOutput from "./components/Demo/demo";
import DemoList from "./components/Demo/DemoList";

import Button from "./components/UI/Button/Button";
import "./App.css";

function App() {
  // const [showPara, setShowPara] = useState(false);
  // const [allowToggle,setAllowToggle] = useState(false);
  const [listTitle, setListTitle] = useState("My List");

  // console.log("App RUNNING");

  // const toggleParaHandler = useCallback(() => {
  //   if(allowToggle){
  //     setShowPara((prevShowPara) => !prevShowPara);
  //   }
  // }, [allowToggle]);

  // const allowToggleHandler = () =>{
  //   setAllowToggle(true);
  // }

  const changeTitleHandler = useCallback(()=>{
    setListTitle("New Title");
  }, []);

  const listItems = useMemo(()=> [5, 3, 1, 10, 9], []);

  return (
    <div className="app">
      <h1>Hi there!</h1>
      {/* <p>This is new!</p> */}

      {/* <DemoOutput show={showPara}>Toggle Paragraph!</DemoOutput>
      <Button onClick={allowToggleHandler}>Allow Toggling</Button>
      <Button onClick={toggleParaHandler}>Toggle Paragraph!</Button> */}
      <DemoList title={listTitle} items={listItems} />
      <Button onClick={changeTitleHandler}>Change List Title</Button>

    </div>
  );
}

export default App;
