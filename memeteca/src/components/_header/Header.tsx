import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import meme from "../../assets/img/troll.png";
import memelogoanimated from "../../assets/img/MEMETECA_Banniereviolet.gif";
import memetecaV2 from "../../assets/img/MEMETECAV2.gif";
import Hbutton from "./Hbutton";
import "./Header.css"


export default function Header(props: any) {
let isLogged = props.loginStatus
console.log("Header says: login status: " + isLogged)
  return (
    <div className="container-header">
      <Link to="/" className="logo">
        <img src={memetecaV2}/>
      </Link>
      <div className="actions-manager">
          <Hbutton name="CREATE MEME" link="/create" />
          <Hbutton name="LOGIN" link="/login" />
      </div>
      <div className="actions-manager">
          <Hbutton name="REGISTER" link="/register" />
          <Hbutton name="UPLOAD" link="/upload" />
      </div>


    </div>
  );
}


/*
export default function Header(props: any) {
  return (
    <div className="container-header">
      <div className="center-header">
      <a href="/">
        <img src={memelogoanimated} alt="meme-img"/>
        </a>
        <div className="title-header">
        
     
          <Hbutton name="CREATE MEME" link="/create" />
        </div>
      </div>
      <div className="button-container">
          {props.option=="home" ? <><Hbutton name="REGISTER" link="/register"/>  <Hbutton name="UPLOAD" link="/upload"/> <Hbutton name="LOGIN" link="/login"/> </> : null}
          {props.option == "register"  ? <><Hbutton name="UPLOAD" link="/upload"/> <Hbutton name="LOGIN" link="/login"/> </>: null}
          {props.option== "login" ?  <Hbutton name="UPLOAD" link="/upload"/> : null}
      </div>
    </div>
  );
}
*/
