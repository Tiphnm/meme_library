import React, { useState } from 'react';
import Header from './components/_header/Header'
import Upload from './components/_upload/Upload'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Hotmemes from './components/_hotmemes/Hotmemes'
import './App.css';
import './components/_header/Header.css'
import loader from "./assets/img/loader.gif"

import Dashboard from './components/Dashboard';
import Login from './components/_login/Login';
import useToken from './components/useToken';

import './App.css';


function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />
  }
  return (
    <div className="App">
        <Router>
      <Header/>

      <div className="wrapper">
        <h1>Application</h1>
      
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/home">
            <Hotmemes loader={loader} /> 
              {/* <Upload/> */}
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