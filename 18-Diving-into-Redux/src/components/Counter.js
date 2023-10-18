import classes from "./Counter.module.css";
import { useSelector, useDispatch, connect } from "react-redux";
import { counterActions } from "../store/counter";

const Counter = () => {
  const counter = useSelector((state) => state.counter.counter);

  const show = useSelector((state) => state.counter.showCounter);

  const dispatch = useDispatch();

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
  };

  const incrementHandler = () => {
    dispatch(counterActions.increment());
  };

  const increaseHandler = () => {
    dispatch(counterActions.increase(5)); // { type: uuid, payload: 10 }
  };

  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};
export default Counter;
// import { useSelector, useDispatch, connect } from "react-redux";
// import { Component } from "react";
// class Counter extends Component {

//   incrementHandler(){
//     this.props.increment();
//   };

//   decrementHandler(){
//     this.props.decrement();
//   };

//   toggleCounterHandler(){};

//   render() {
//     return (
//       <main className={classes.counter}>
//         <h1>Redux Counter</h1>
//         <div className={classes.value}>{this.props.counter}</div>
//         <div>
//           <button onClick={this.incrementHandler.bind(this)}>Increment</button>
//           <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
//         </div>
//         <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
//       </main>
//     );
//   }
// }

// // 1. maps redux state to props
// const mapStateToProps = (state) => {
//   return {
//     // bind the counter value in redux state to here
//     counter: state.counter
//   }
// };

// // 2. maps dispatch to props
// const mapDispatchToProps = (dispatch) => {
//   return {
//     // bind the counter value in redux state to here
//     increment: () => dispatch({ type: 'increment' }),
//     decrement: () => dispatch({ type: 'decrement' }),
//   }
// };

// export default connect(mapStateToProps,mapDispatchToProps)(Counter);
