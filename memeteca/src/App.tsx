import React, { useState, useEffect } from 'react';
import Header from './components/_header/Header'
import Upload from './components/_upload/Upload'
import { BrowserRouter as Router, Switch, Route, useLocation, Redirect, useHistory } from "react-router-dom"
import HotMemes from './components/_hotmemes/Hotmemes'
import Generator from './components/_GenerateMeme/Generator'
import loaderBlack from "./assets/img/loaderblack.gif"
import Login from './components/_login/Login';
import useToken from './typescript/useToken';
import Register from './components/_register/Register';
import './App.css';
import dotenv from "dotenv"
dotenv.config()

function App(props:any) {
  console.log(process.env.MONGOURI)
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
  
  
      
      <div className="wrapper">

        {isLogged ?<div> You are logged as:   <button 
        onClick={ ()=> { removeToken(token)}}>Click here to logout</button> </div> : "" }
          <Switch>     
            <Route exact path="/">
              <Header option="home" />
              <HotMemes loader={loaderBlack} />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            {/* Hot memes principal section  */}

            <Route path="/home">
              <Header option="home" />
              <HotMemes loader={loaderBlack} />
            </Route>

            {/* Upload */}
            <Route path="/upload">
              {/* Upload component requires user to Have a log in session */}
            <Upload /> 
            </Route>
            <Route path="/create">
               {/* <CreateMeme /> */}
               <Generator />
            </Route>

          </Switch>
        </div>
      </Router>
    </div>
  );
}
export default App;