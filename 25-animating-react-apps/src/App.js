import React, { Component, useState } from "react";

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";
import Transition from "react-transition-group/Transition";

class App extends Component {
  state = {
    modalIsOpen: false,
    showBlock: false,
  };

  showModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    return (
      <div className="App">
        <h1>React Animations</h1>
        <button
          className="Button"
          onClick={() =>
            this.setState((prevState) => ({ showBlock: !prevState.showBlock }))
          }
        >
          Toggle
        </button>
        <br />
        <Transition
          mountOnEnter
          unmountOnExit
          in={this.state.showBlock}
          timeout={1000}
          onEnter={() => {
            console.log("onEnter");
          }}
          onEntering={() => {
            console.log("onEntering");
          }}
          onEntered={() => {
            console.log("onEntered");
          }}
          onExit={() => {
            console.log("onExit");
          }}
          onExiting={() => {
            console.log("onExiting");
          }}
          onExited={() => {
            console.log("onExited");
          }}
        >
          {(state) => (
            <div
              style={{
                backgroundColor: "red",
                width: "100px",
                height: "100px",
                margin: "auto",
                transition: "opacity 1s ease-out",
                opacity: state === "exiting" ? 0 : 1,
              }}
            />
          )}
        </Transition>

        <Modal show={this.state.modalIsOpen} closed={this.closeModal} />


          {this.state.modalIsOpen ? (
            <Backdrop show />
          ) : null}


        <button className="Button" onClick={this.showModal}>
          Open Modal
        </button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;
