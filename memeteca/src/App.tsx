import React, { useState } from 'react';
import Header from './components/Header'
import Upload from './components/Upload'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import useToken from './components/useToken';

import './App.css';
import './components/Login.css'
import './components/Header.css'

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />
  }
  return (
    <div className="App">
      <Header />
      <div className="wrapper">
        <h1>Application</h1>
        <BrowserRouter>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/home">
              <Upload />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}
export default App;