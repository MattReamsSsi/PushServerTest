import React, { Component } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from '../reduxStuff/counterSlice';

export const Counter = (props) => {
  // static displayName = Counter.name;

  // constructor(props) {
  //   super(props);
  //   this.state = { currentCount: 0 };
  //   this.incrementCounter = this.incrementCounter.bind(this);
  // }

  // incrementCounter() {
  //   this.setState({
  //     currentCount: this.state.currentCount + 1
  //   });
  // }

  const count = useSelector(selectCount);

  const dispatch = useDispatch();

  return (
    <div>
      <h1>Counter</h1>

      <p>This is a simple example of a React component.Matt!!!</p>

      <p aria-live="polite">Current count: <strong>{count}</strong></p>

      <button className="btn btn-primary" onClick={() => dispatch(increment())}>Increment</button>
    </div>
  );
}
