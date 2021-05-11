import React, { useState, useEffect } from 'react';
import Header from './components/_header/Header'
import Upload from './components/_upload/Upload'
import { BrowserRouter as Router, Switch, Route, useLocation, Redirect, useHistory } from "react-router-dom"
import HotMemes from './components/_hotmemes/Hotmemes'
import ButtonRegister from './components/_buttonregister/ButtonRegister'
import './App.css';
import './components/_header/Header.css'
import loader from "./assets/img/loader.gif"
import loaderBlack from "./assets/img/loaderblack.gif"
import Dashboard from './components/Dashboard';
import Login from './components/_login/Login';
import useToken from './typescript/useToken';
import './App.css';
import Register from './components/_register/Register';
import { bool } from 'prop-types';


function App(props:any) {
  let isLogged;
  const {token, setToken} = useToken()
  const [logged, setLogged] =  useState(false)

  console.log("APP: Where is my token " + token)

  if (token == null) {
    isLogged = false
  }
  
 /* LOGOUT FUNCTION */
   const removeToken = (token: String | null) => {
    localStorage.removeItem('token');
    setToken({token: null});
  };
  {console.log("LOGIN STATUS: "+isLogged)}



/*   REDIRECT */ 


  /* */
  return (
    <div className="App">
        {/* Header and Nav Bar */}
    <Router>
    {/* Header and Nav Bar */}          
      <Header path={props.location} history={history} />
      
      <div className="wrapper">

        {isLogged ?<div> You are logged as:   <button 
        onClick={ ()=> { removeToken(token)}}>Click here to logout</button> </div> : "" }
          <Switch>     
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            {/* Hot memes principal section  */}

            <Route path="/home">
              <HotMemes loader={loaderBlack} />
            </Route>

            {/* Upload */}
            <Route path="/upload">
              {/* Upload component requires user to Have a log in session */}
            <Upload /> 
            </Route>

            <Route path="/dashboard">
              <Dashboard />
            </Route>

          </Switch>
        </div>
      </Router>
    </div>
  );
}
export default App;