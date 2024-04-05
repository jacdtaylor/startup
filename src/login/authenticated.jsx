import React from 'react';
import { useNavigate } from 'react-router-dom';



import './authenticated.css';

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    fetch(`/api/auth/logout`, {
      method: 'delete',
    })
      .catch(() => {
        // Logout failed. Assuming offline
      })
      .finally(() => {
        localStorage.removeItem('userName');
        props.onLogout();
      });
  }

  return (
    <div className='auth_cont'>
      <div className='playerName'>{props.userName}</div>
      <button variant='primary' className='loginbutton' onClick={() => navigate('/manager')}>
        Manager
      </button>
      <button variant='secondary' className='loginbutton' onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
}
