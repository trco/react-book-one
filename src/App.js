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
      <div className="page">
        <h2>{title}</h2>
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
          >
            Search
          </Search>
        </div>
        <Table
          list={list}
          searchTerm={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

// Search as stateless functional component
// if component doesn't have it's own state it should be functional component
const Search = ({ value, onChange, children }) =>
  <form>
    {children}
    <input
      type="text"
      value={value}
      onChange={onChange}
    />
  </form>

const midColumn = {
  width: '30%',
};

const smallColumn = {
  width: '10%',
};

// Table as stateless functional component
const Table = ({ list, searchTerm, onDismiss }) =>
  <div className="table">
    <div className="table-row table-header">
      <span style={midColumn}>
        Library
      </span>
      <span style={midColumn}>
        Author
      </span>
      <span style={midColumn}>
        Number of comments
      </span>
      <span style={smallColumn}>
        Points
      </span>
      <span style={smallColumn}>
      </span>
    </div>
    {list.filter(isSearched(searchTerm)).map(item => // filter based on current this.state.searchTerm
      <div key={item.objectID} className="table-row">
        <span style={midColumn}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={midColumn}>
          {item.author}
        </span>
        <span style={midColumn}>
          {item.num_comments}
        </span>
        <span style={smallColumn}>
          {item.points}
        </span>
        <span style={smallColumn}>
          <Button
          onClick={() => onDismiss(item.objectID)}
          className="button-inline"
          >
          Dismiss
          </Button>
        </span>
      </div>
    )}
  </div>

// Button as stateless functional component
const Button = ({ className = '', onClick, children }) =>
  <button
    className={className}
    onClick={onClick}
    type="button"
  >
    {children}
  </button>

export default App;
