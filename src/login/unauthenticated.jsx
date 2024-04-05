import React from 'react';

import Button from 'react-bootstrap/Button';
import {MessageDialog} from './messageDialog';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }

  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }

  async function loginOrCreate(endpoint) {
    console.log(userName);
    console.log(password);

        const response = await fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({ email: userName, password: password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('userName', userName);
            props.onLogin(userName);
        } else {
            const body = await response.json();
            console.error(body);
        }

}

  return (
    <>
      <div>
        <div className='input-group mb-3'>
          <input
            className='login-input'
            type='text'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder='your@email.com'
          />
        </div>
        <div className='input-group mb-3'>
          <input
            className='login-input'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            placeholder='password'
          />
        </div>
        <button variant='primary' className="loginbutton" onClick={() => loginUser()}>
          Login
        </button>
        <button variant='secondary' className="loginbutton" onClick={() => createUser()}>
          Create
        </button>
      </div>

      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </>
  );
}
