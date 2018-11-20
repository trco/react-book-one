import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: "React",
    url: "https://facebook.github.io/react/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: "Redux",
    url: "https://github.com/reactjs/redux",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];
const user = {
  first_name: "John",
  last_name: "Doe"
}
const title = "My first React app";

// #1: declaration of App as component, which is instantiated with <App />
// #2: instance of the App component can be used as element in application
// #3: components are build from elements
class App extends Component {
  constructor(props) {
    super(props);
    // setting initial internal App's state
    this.state = {
      list,
      user,
      title
    };
    // class methods
    // binding onDismiss method to the App class
    this.onDismiss = this.onDismiss.bind(this);
  }

  // methods
  onDismiss(id) {
    // filter evaluates each item in this.state.list and builds new array
    // with items that pass the test
    const updatedList = this.state.list.filter(item => item.objectID !== id);
    // update the list in internal App's state
    // setState calls render after it's executed
    this.setState({ list: updatedList });
  }

  render() {
    return (
      <div className="App">
        <h2>{this.state.title}</h2>
        <p>Welcome {this.state.user["first_name"]} {this.state.user["last_name"]}.</p>
        { this.state.list.map(item =>
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <button
                onClick={() => this.onDismiss(item.objectID)}
                type="button">
                Dismiss
              </button>
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default App;
