import React, { Component } from 'react';
import './App.css';

const title = "My first React app";

const DEFAULT_QUERY = "redux";
const DEFAULT_PAGE = 0;
const DEFAULT_HPP = '20';

const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";
const PARAM_PAGE = "page=";
const PARAM_HPP = 'hitsPerPage=';

// declaration of App as component, which is instantiated with <App />
// instance of the App component can be used as element in application
// components are build from elements
class App extends Component {
  constructor(props) {
    super(props);
    // setting initial internal App's state
    this.state = {
      title,
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
    };
    // class methods
    // binding methods to the App class
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.resultToState = this.resultToState.bind(this);
    this.needsToRunFetch = this.needsToRunFetch.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  // methods
  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];
    // filter evaluates each item in this.state.result and builds new array
    // with items that pass the test
    const updatedHits = hits.filter(item => item.objectID !== id);
    // update the result in internal App's state
    // setState calls render after it's executed
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  // searchTerm is stored to internal App's state everytime the Search field changes
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onSearchSubmit(event) {
    // searchTerm updates on every onChange in search field
    // after submission new results are fetched from API
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });

    // runs fetchData only if results[searchTerm] doesn't exist yet
    if (this.needsToRunFetch(searchTerm)) {
      this.fetchData(searchTerm, DEFAULT_PAGE);
    }

    event.preventDefault();
  }

  resultToState(result) {
    // get hits and page from result = { hits: x, page: y }
    const { hits, page } = result;
    const { searchKey, results } = this.state;

    // if results are empty set oldHits to empty array else set them to the hits in the internal state
    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];

    // join oldHits with new hits from results passed as argument
    const updatedHits = [ ...oldHits, ...hits ];

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  needsToRunFetch(searchTerm) {
    return !this.state.results[searchTerm];
  }

  fetchData(searchTerm, page) {
    const requestURL = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`;
    fetch(requestURL)
      .then(response => response.json())
      .then(result => this.resultToState(result));
  }

  // lifecycle method, which is ran after component is rendered
  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchData(searchTerm, DEFAULT_PAGE);
  }

  // filter function iterates over array and removes items that don't match the condition
  // map function runs for every element in an array

  render() {
    const { title, results, searchKey, searchTerm } = this.state;
    // if results[searchKey].page exists page=results[searchKey].page else page=0
    const page = (
      results &&
      results[searchKey] &&
      results[searchKey].page
    ) || 0;

    // if results[searchKey].hits exists list=results[searchKey].hits else hits=[]
    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || [];

    return (
      <div className="page">
        <h2>{title}</h2>
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange} // triggers event
            onSubmit={this.onSearchSubmit} // triggers event
          >
            Search
          </Search>
        </div>
        <Table
          list={list}
          onDismiss={this.onDismiss}
        />
        <div className="interactions">
          <Button
            onClick={() => this.fetchData(searchKey, page + 1)} // triggers function
          >
            More
          </Button>
        </div>
      </div>
    );
  }
}

// Search as stateless functional component
// if component doesn't have it's own state it should be functional component
const Search = ({ value, onChange, onSubmit, children }) =>
  <form onSubmit={onSubmit}>
    <input
      type="text"
      value={value}
      onChange={onChange}
    />
    <button type="submit">{children}</button>
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
    {list.map(item => // filter based on current this.state.searchTerm
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
          onClick={() => onDismiss(item.objectID)} // triggers function
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
