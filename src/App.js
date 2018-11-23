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
  {
    title: "Django",
    url: "https://github.com/django",
    author: "John Doe",
    num_comments: 8,
    points: 5,
    objectID: 2,
  },
];

const user = {
  first_name: "John",
  last_name: "Doe"
}

const title = "My first React app";

// returns true if searchTerm is empty string or item.title matches searchTerm
function isSearched(searchTerm) {
  return item => !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
}

// #1: declaration of App as component, which is instantiated with <App />
// #2: instance of the App component can be used as element in application
// #3: components are build from elements
class App extends Component {
  constructor(props) {
    super(props);
    // setting initial internal App's state
    this.state = {
      title,
      list,
      searchTerm: "",
    };
    // class methods
    // binding onDismiss method to the App class
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
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

  // searchTerm is stored to internal App's state everytime the Search field changes
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  // filter function iterates over array and removes items that don't match the condition
  // map function runs for every element in an array

  render() {
    const { title, list, searchTerm } = this.state;
    return (
      <div className="App">
        <h2>{title}</h2>
        <Search
          value={searchTerm}
          onChange={this.onSearchChange}
        />
        <Table
          list={list}
          searchTerm={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

class Search extends Component {
  render() {
    // get properties passed to the component on instantiation inside of App
    const { value, onSearchChange } = this.props
    return (
      <form>
        <input
          type="text"
          placeholder="Search"
          value={value}
          onChange={onSearchChange}
        />
      </form>
    )
  }
}

class Table extends Component {
  render() {
    // get properties passed to the component on instantiation inside of App
    const { list, searchTerm, onDismiss } = this.props
    return (
      <div>
      {list.filter(isSearched(searchTerm)).map(item => // filter based on current this.state.searchTerm
        <div key={item.objectID}>
          <span>
            <a href={item.url}>{item.title}</a>
          </span>
          <span>{item.author}</span>
          <span>{item.num_comments}</span>
          <span>{item.points}</span>
          <span>
            <button // onDismiss is enclosed by another function so the objectID can be passed to it
              onClick={() => onDismiss(item.objectID)}
              type="button">
              Dismiss
            </button>
          </span>
        </div>
      )}
      </div>
    )
  }
}

export default App;
