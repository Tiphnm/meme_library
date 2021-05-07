import React from 'react';
import Header from './components/_header/Header'
import Upload from './components/_upload/Upload'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Hotmemes from './components/_hotmemes/Hotmemes'
import './App.css';
import './components/_header/Header.css'
import loader from "./assets/img/loader.gif"
function App() {
  return (
    <div className="App">
      <Header/>
      <Hotmemes loader={loader} /> 
      {/* <Upload/> */}
    </div>
  );
}
export default App;
