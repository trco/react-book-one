import React, { Component } from 'react';

class Search extends Component {
  render() {
    // get properties passed to the component on instantiation inside of App
    const { value, onSearchChange, children } = this.props
    return (
      <form>
        {children}
        <input
          type="text"
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
            <Button onClick={() => onDismiss(item.objectID)}>
              Dismiss
            </Button>
          </span>
        </div>
      )}
      </div>
    )
  }
}


class Button extends Component {
  render() {
    const { className = '', onClick, children } = this.props; // className is set as default parameter
    return (
      <button
        className={className}
        onClick={onClick}
        type="button"
      >
        {children}
      </button>
    )
  }
}
