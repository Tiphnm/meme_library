import React, {SyntheticEvent, useState } from 'react';
import axios from "axios"
import './Login.css';
import * as cors from 'cors';


export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
/*
  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await fetch('http://localhost:4000/login', {
      method:'POST',
      headers:{'Content-Type' : 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        username,
        password
      })
    })
  }
*/ 

async function submit() {
  const url = "http://localhost:4000/login"
  await axios.post(url, {
    headers:{'Content-Type' : 'application/json'},
    credentials: {
      username,
      password
    }
  })
}


  return (
    <div className="login-wrapper">
      <form className="form" onSubmit={submit}>
        <h1 className="title-login">Please Sign in</h1>
        <div className="form_username">
          <h3>Username</h3>
          <input id="inputUsername" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
        </div>
        <div className="form_password">
          <h3>Password</h3>
          <input id="inputPassword" placeholder="Password" type="text" onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="form_button">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}
