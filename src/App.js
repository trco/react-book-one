import React, { Component } from 'react';
import './App.css';

const title = "My first React app";
const DEFAULT_QUERY = "redux";
const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";

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
      result: null,
      searchTerm: DEFAULT_QUERY,
    };
    // class methods
    // binding methods to the App class
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.resultToState = this.resultToState.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  // methods
  onDismiss(id) {
    // filter evaluates each item in this.state.result and builds new array
    // with items that pass the test
    const updatedHits = this.state.result.hits.filter(item => item.objectID !== id);
    // update the result in internal App's state
    // setState calls render after it's executed
    this.setState({
      // hits in this.state.result are updated using spread operator for objects
      // state is thus not mutated directly like in this.state.result.hits = updatedHits
      result: { ...this.state.result, hits: updatedHits }
    });
  }

  // searchTerm is stored to internal App's state everytime the Search field changes
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  resultToState(result) {
    this.setState({ result: result });
  }

  fetchData(searchTerm) {
    const requestURL = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`;
    fetch(requestURL)
      .then(response => response.json())
      .then(result => this.resultToState(result));
  }

  // lifecycle method, which is ran after component is rendered
  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchData(searchTerm);
  }

  // filter function iterates over array and removes items that don't match the condition
  // map function runs for every element in an array

  render() {
    const { title, result, searchTerm } = this.state;

    if (!result) { return null; }

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
          list={result.hits}
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
