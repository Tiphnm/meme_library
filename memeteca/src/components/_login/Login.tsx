import React, {SyntheticEvent, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory } from "react-router-dom"
import PropTypes from 'prop-types';
import axios, { AxiosResponse } from "axios"
import Header from '../_header/Header'
import './Login.css';
import * as cors from 'cors';

const url = "http://localhost:4000/login"
type Props ={
  setToken?: any
}

export default function Login(props: any) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

async function loginUser() {
  let data = await axios.post(url, {
    headers:{'Content-Type' : 'application/json'},
    credentials: {
      username,
      password
    }
  }).then(res =>  res)
  return data
}

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  const loginData =  await loginUser()

  // Login was succesfull 

  props.setToken? props.setToken(loginData.data):  console.log(loginData.data)
}

  return (
    <>
    <Header option="login"/>
    <div className="login-wrapper">
      <br></br>
      <h1 className="title">LOGIN FORM </h1>
      <br></br>
      <form className="form" onSubmit={handleSubmit}>
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
    </>
  )
}
