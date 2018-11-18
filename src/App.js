import React, { Component } from 'react';
import './App.css';

// #1: declaration of App as component, which is instantiated with <App />
// #2: instance of the App component can be used as element in application
// #3: components are build from elements
class App extends Component {
  render() {
    const list = [
      {
        title: 'React',
        url: 'https://facebook.github.io/react/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
      },
      {
        title: 'Redux',
        url: 'https://github.com/reactjs/redux',
        author: 'Dan Abramov, Andrew Clark',
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
    return (
      <div className="App">
        <h2>{title}</h2>
        <p>Welcome {user["first_name"]} {user["last_name"]}.</p>
        { list.map(function(item) {
          return (
            <div key={item.objectID}>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
