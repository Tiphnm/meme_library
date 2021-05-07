import React, { useState } from 'react';
import Header from './components/_header/Header'
import Upload from './components/_upload/Upload'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import HotMemes from './components/_hotmemes/Hotmemes'
import './App.css';
import './components/_header/Header.css'
import loader from "./assets/img/loader.gif"
import loaderBlack from "./assets/img/loaderblack.gif"

import Dashboard from './components/Dashboard';
import Login from './components/_login/Login';
import useToken from './components/useToken';

import './App.css';


function App() {
   /*
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />
  } */ 

  return (
    <div className="App">
    <Router>


    {/* Header and Nav Bar */}          
      <Header/>
      
      <div className="wrapper">
        <h1>Memeteca hottest memes</h1>
          <Link to="/upload"> test </Link>
          <Switch>
            
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            
            <Route path="/login">
             {/* <Login /> */  } 
            </Route>

            {/* Hot memes principal section  */}
            <Route path="/home">
              
              <HotMemes loader={loaderBlack} />
             
            </Route>
           
            {/* Upload */}
            <Route path="/upload">
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