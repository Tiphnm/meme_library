import React, {useState } from 'react';
/*  Components */
import getApi from '../typescript/GetApi'
import {typeToken} from "../typescript/useToken"

/* Libs */ 
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory } from "react-router-dom"
import { Formik, Field, Form, ErrorMessage} from 'formik';
import axios from "axios"


type loginProps ={
  setToken: (param: typeToken)=> void;
  loginStatus: (status:boolean) =>void;
  handleSubmit?: () => void;

}

type formProps = {

}

export default function Login(props: loginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, setLogin] = useState(false)
  const [error, setError] = useState("")

  const initialValues={
    username: "",
    password: ""
  }



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
//let from_url = props.url

let history = useHistory();

async function handleSubmit() {
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
    <div className="container-form">

      <h1 className="title">Please Sign in 🧐</h1>

      {error==""? "": <p className="error">{error}</p>}

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>

      { props => (    
      <form className="form-auth" onSubmit={props.handleSubmit}>
        <div className="form-group">
          <label htmlFor="inputUsername">E-mail</label>
          <input id="inputUsername" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
        </div>

        <div className="form-group">
        <label htmlFor="inputPassword"> Password</label>
          <input id="inputPassword" placeholder="Password" type="password" onChange={e => setPassword(e.target.value)}
          />
        </div>


          <button type="submit" className="btn-login">Login</button>

      </form>

       )}
    </Formik>
    </div>
  )
}
