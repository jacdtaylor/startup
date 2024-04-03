
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Manager } from './manager/manager';
import { Forum } from './forum/forum';
import { About } from './about/about';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <BrowserRouter>
    <div>
      <header className='container-fluid'>
        <nav className='navbar fixed-top navbar-dark'>
          <div className='header'>
            Colab Task Manager<sup>&reg;</sup>
          </div>
          <div className="dropdown">
    <button className="dropbtn">Menu</button>
    <div className="dropdown-content">
    
      <NavLink className='nav-link' to=''>Login</NavLink>
      <NavLink className='nav-link' to='manager'>Manager</NavLink>
      <NavLink className='nav-link' to='forum'>Forum</NavLink>
      <NavLink className='nav-link' to='about'>About</NavLink>
    </div>
    </div>
        </nav>
      </header>

      <Routes>
        <Route path='/' element={<Login />} exact />
        <Route path='/manager' element={<Manager />} />
        <Route path='/forum' element={<Forum />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

      <footer>
      <div className = 'containter-fluid'>
      <hr />
      <span className="text-reset">Jac Taylor</span>
      <br />
      <a href="https://github.com/jacdtaylor/startup">GitHub</a>
      </div>
    </footer>
    </div>
    </BrowserRouter>
  );

}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}