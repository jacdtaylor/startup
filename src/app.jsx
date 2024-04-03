

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <div>
      <header className='container-fluid'>
        <nav className='navbar fixed-top navbar-dark'>
          <div className='header'>
            Colab Task Manager<sup>&reg;</sup>
          </div>
          <div className="dropdown">
    <button className="dropbtn">Menu</button>
    <div className="dropdown-content">
      <a href="index.html" onclick="Logout()">Logout</a>
      <a href="manager.html">Personal Manager</a>
      <a href="shared.html">Forum</a>
      <a href="about.html">About</a>
    </div>
    </div>
        </nav>
      </header>

      <main className = 'containter-fluid'>App components go here</main>

      <footer>
      <div className = 'containter-fluid'>
      <hr />
      <span className="text-reset">Jac Taylor</span>
      <br />
      <a href="https://github.com/jacdtaylor/startup">GitHub</a>
      </div>
    </footer>
    </div>
  );

}
