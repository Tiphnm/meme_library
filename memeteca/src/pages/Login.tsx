import React, {useState } from 'react';
/*  Components */
import getApi from '../typescript/GetApi'

/* Libs */ 
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory } from "react-router-dom"

import axios from "axios"
import dotenv from "dotenv"
/* assets */ 
import './Login.css';


type Props ={
  setToken?: ()=>void
}

export default function Login(props: any) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, setLogin] = useState(false)
  const [error, setError] = useState("")
 
async function loginUser() {

  let data = await axios.post(getApi()+"/login", {
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
    //history.push("/")
    setLogin(true)
    props.loginStatus(true)
    //history.push("/")
  }

}


  return (
    <>
    <div className="login-wrapper">
      <h1 className="title">LOGIN FORM </h1>
      {error==""? "": <p>{error}</p>}
      <br />
      <form className="form" onSubmit={ 
        handleSubmit
        }>

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
