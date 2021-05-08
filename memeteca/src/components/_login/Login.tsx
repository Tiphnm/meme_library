import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

async function loginUser(credentials: any) {
  return fetch('http://localhost:4000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function Login({ setToken }: any) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async ()=> {
    
    const token = await loginUser({
      username,
      password
    });
    setToken(token);


  }
  return (
    <div className="login-wrapper">
      <form onSubmit={ handleSubmit }>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
         {/*  <button type="submit" onClick={ e => {e.preventDefault(); handleSubmit()}}>Submit</button>  */}
         <button type="submit" onClick={ e => {e.preventDefault(); handleSubmit()}}>Submit</button>
        </div>
      </form>
    </div>
  )
}
Login.propTypes = {
  setToken: PropTypes.func
}