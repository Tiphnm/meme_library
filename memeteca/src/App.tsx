import React, { useState, useEffect } from "react";
/* Local Components */
//import Header from './components/_header/Header'
import Upload from "./pages/Upload";
import HotMemes from "./pages/Hotmemes";
import Generator from "./pages/_GenerateMeme/Generator";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Hbutton from "./components/Hbutton";
import Burguer from "./components/Burguer"

/* TypeScript types  */
import { decodedToken } from "./typescript/types";
/* Libs */
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useHistory,
} from "react-router-dom";
import useToken from "./typescript/useToken";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"; // Dotenv is not effective  IN REACT
import env from "@beam-australia/react-env"; // NEW ENV LIB
/* Assets */
import memetecaV2 from "./assets/img/MEMETECAV2.gif";
import "./assets/style/App.css";

/* Env vars */
dotenv.config();
const jwtSecret = process.env.REACT_APP_SECRET_TOKEN || "memeteca";
const jojo = process.env.JOJO
//console.log("SECRET "+jwtSecret)

/* Props: any just for testing, will be removed  */
function App(props: any) {
  const { token, setToken } = useToken();
  const [logged, setLogged] = useState(false);
  console.log(jojo)
  console.log("APP: Where is my token " + token);

  /* LOGOUT FUNCTION */
  const removeToken = (token: String | null) => {
    localStorage.removeItem("token");
    setToken(null!);
    window.location.reload();
  };
  {
    console.log("LOGIN STATUS: " + logged);
  }

  useEffect(() => {
    token == null ? setLogged(false) : setLogged(true);
  }, []);

  /*   REDIRECT */

  let history = useHistory();

  /* GET USERNAME IF LOGGED */
  let username;
  if (token) {
    username = jwt.verify(token, jwtSecret) as decodedToken;
  }

  /* */
  return (
    <Router>
        {/* ----------- Header and Nav Bar ---------------- */}
        <nav className="container-header">

          <div className="logo">
            <Link to="/">
              <img src={memetecaV2} />
            </Link>
          </div>

         
        
          <div className="actions-container">
            <Hbutton name="CREATE MEME" link="/create" />
            <Hbutton name="UPLOAD" link="/upload" />
          {logged ? "":  <Hbutton name="LOGIN" link="/login" /> }
          {logged ? (
                <div>
                  <br /> You are logged as: {username?.user} <br />
                  <button onClick={() => { removeToken(token);}} >
                    Click here to logout
                  </button>
                </div>
              ) : (
                ""
              )}
            {logged ? "": <Hbutton name="REGISTER" link="/register" /> }
   
          </div>
          {/*  Responsive burguer Menu */}
                  <Burguer />
        </nav>

        {/* -------------- Header and Nav Bar----------------- */}

        <div className="wrapper">
          <Switch>
            <Route exact path="/">
              {/*  LOGOUT */}
            
              <HotMemes />
            </Route>

            {/* LOGIN SITE */}
            <Route path="/login">
              {logged ? (
                <Redirect to="/profile" />
              ) : (
                <Login setToken={setToken} loginStatus={logged} />
              )}
            </Route>

            {/* REGISTER FORM  */}
            <Route path="/register">
              <Register />
            </Route>

            {/* Hot memes principal section  */}

            <Route path="/home">
  
            {console.log(env("SECRET_TOKEN"))}
            {console.log(process.env.REACT_APP_SECRET_TOKEN)}
              <HotMemes />
            </Route>

            {/* Upload */}
            <Route path="/upload">
              {/* Upload component requires user to Have a log in session */}
              {logged ? <Upload /> : <Redirect to="/login" />}
            </Route>

            {/* <CreateMeme /> */}
            <Route path="/create">
              <Generator />
            </Route>

          </Switch>
        </div>
    </Router>
  );
}
export default App;
