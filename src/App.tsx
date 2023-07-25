import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import Main from '@components/templates/Login';

function App() {
  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/topics">Topics</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
      <hr />
      <Main />
    </>
  );
}

export default App;
