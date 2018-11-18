import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// #1: rendering App as element into a root DOM node
// #2: everything inside root DOM node is managed by ReactDOM
ReactDOM.render(<App />, document.getElementById('root'));


// #1: prevents page refresh & reloads application after change
// #2: enables keeping application state
if (module.hot) {
  module.hot.accept()
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
