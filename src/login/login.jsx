import React from 'react';
import './login.css';

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';
export function Login({ userName, authState, onAuthChange }) {




  return (
    <main className='container-fluid bg-secondary text-center'>
    <div>
      {authState !== AuthState.Unknown && <h1>Welcome to Colab Task</h1>}
      {authState === AuthState.Authenticated && (
        <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
      )}
      {authState === AuthState.Unauthenticated && (
        <Unauthenticated
          userName={userName}
          onLogin={(loginUserName) => {
            onAuthChange(loginUserName, AuthState.Authenticated);
          }}
        />
      )}
    </div>
  </main>
  );
}

// (async () => {
//   const userName = localStorage.getItem('userName');
//   // if (userName) {
//     // document.querySelector('#playerName').textContent = userName;
//     // setDisplay('loginControls', 'none');
//     // setDisplay('playControls', 'block');
//   // } else {
//     setDisplay('loginControls', 'block');
//     setDisplay('playControls', 'none');
//   // }
// })();

// async function loginUser() {
//   loginOrCreate(`/api/auth/login`);
// }

// async function createUser() {
//   loginOrCreate(`/api/auth/create`);
// }

// async function loginOrCreate(endpoint) {
//   const userName = document.querySelector('#userName')?.value;
//   const password = document.querySelector('#userPassword')?.value;

//   // Check if username or password is empty
//   if (!userName || !password) {
//     alert("Please enter both username and password.");
//     return; // Exit function early
//   }

//   const response = await fetch(endpoint, {
//     method: 'post',
//     body: JSON.stringify({ email: userName, password: password }),
//     headers: {
//       'Content-type': 'application/json; charset=UTF-8',
//     },
//   });

//   if (response.ok) {
//     localStorage.setItem('userName', userName);
//     window.location.href = 'manager.html';
//   } else {
//     const body = await response.json();
//     const modalEl = document.querySelector('#msgModal');
//     modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
//     const msgModal = new bootstrap.Modal(modalEl, {});
//     msgModal.show();
//   }
// }


// function manager() {
//   window.location.href = 'manager.html';
// }

// function logout() {
//   localStorage.removeItem('userName');
//   fetch(`/api/auth/logout`, {
//     method: 'delete',
//   }).then(() => (window.location.href = '/'));
// }

// async function getUser(email) {
//   let tasks = [];
//   // See if we have a user with the given email.
//   const response = await fetch(`/api/user/${email}`);
//   if (response.status === 200) {
//     return response.json();
//   }

//   return null;
// }

// function setDisplay(controlId, display) {
//   const playControlEl = document.querySelector(`#${controlId}`);
//   if (playControlEl) {
//     playControlEl.style.display = display;
//   }
// }

{/* <main>
<h1>Welcome</h1>
<div id="loginControls">
  <div className="input-group mb-3">
    <span className="input-group-text">@</span>
    <input className="form-control" type="text" id="userName" placeholder="your@email.com" />
  </div>
  <div className="input-group mb-3">
    <span className="input-group-text">🔒</span>
    <input className="form-control" type="password" id="userPassword" placeholder="password" />
  </div>
  <button type="button" className="btn btn-primary" onclick="loginUser()">Login</button>
  <button type="button" className="btn btn-primary" onclick="createUser()">Create</button>
</div>
<div id="playerName"></div>
</main> */}