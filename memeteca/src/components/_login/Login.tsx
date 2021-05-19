import React, {useState } from 'react';
/*  Components */
//import Header from '../_header/Header'
/* Libs */ 
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory } from "react-router-dom"
import PropTypes from 'prop-types';
import axios from "axios"
import dotenv from "dotenv"
/* assets */ 
import './Login.css';

dotenv.config()

/* Env vars */ 
const noenv: string = "CONFIGURE YOUR ENV VARS"
const environment = process.env.REACT_APP_ENV!
const api_dev = process.env.REACT_APP_API_DEV!
const api_prod = process.env.REACT_APP_API_PROD!

/* If the ENV environment is active then our api is in Localhost */ 
let api_url: string 
environment == "DEV"? (api_url = api_dev) : (api_url = api_prod)


type Props ={
  setToken?: ()=>void
}

export default function Login(props: any) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, setLogin] = useState(false)
  const [error, setError] = useState("")
 
async function loginUser() {
  let data = await axios.post(api_url+"/login", {
    headers:{'Content-Type' : 'application/json'},
    credentials: {
      username,
      password
    }
  }).then(res =>  res).catch((err) => {
   if(err.response) {
    console.log("my error: " + err)
    console.log(err.response.data)
    setError(err.response.data)
   }})
  return data
}

/* Handle the FORM SENT */
let from_url = props.url
let history = useHistory();

async function handleSubmit(e: any) {
  e.preventDefault();
  const loginData =  await loginUser()
  // Login was succesfull 
  console.log(loginData)

  if (loginData) {
    props.setToken(loginData['data'])
    console.log(loginData['data'])
    history.push("/")
  }

}


  return (
    <>
    <div className="login-wrapper">
      <h1 className="title">LOGIN FORM </h1>
      {error==""? "": <p>{error}</p>}
      <br />
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
