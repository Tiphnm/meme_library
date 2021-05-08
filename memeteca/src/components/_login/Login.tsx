import React, { useState } from 'react';
import './Login.css';


export default function Login() {
  return (
    <div className="login-wrapper">
      <form className="form">
        <h1>Please Login</h1>
        <div className="form_username">
          <h3>Username</h3>
          <input id="inputUser" placeholder="Username" />
        </div>
        <div className="form_password">
          <h3>Password</h3>
          <input id="inputPassword" placeholder="Password" type="Password" />
        </div>
        <div className="form_button">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}
