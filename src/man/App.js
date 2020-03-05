import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Here's another thing.
        </p>
        <a
          className="App-link"
          href="/man"
          target="_blank"
          rel="noopener noreferrer"
        >
          Thing link
        </a>

      </header>
    </div>
  );
}

export default App;
