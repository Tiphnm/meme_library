import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import meme from "../../assets/img/troll.png";
import Hbutton from "./Hbutton";
import "./Header.css"

export default function Header(props: any) {
  return (
    <div className="container-header">
      <div className="center-header">
        <img src={meme} alt="meme-img"/>
        <div className="title-header">
          <a href="/">
            <h1>MEMETECA</h1>
          </a>
        </div>
      </div>
      {/*  Buttons  */}
      <div className="button-container">
          {props.option=="home" ? <><Hbutton name="REGISTER" link="/register"/>  <Hbutton name="UPLOAD" link="/upload"/> <Hbutton name="LOGIN" link="/login"/> </> : null}
          {props.option == "register"  ? <><Hbutton name="UPLOAD" link="/upload"/> <Hbutton name="LOGIN" link="/login"/> </>: null}
          {/* {props.option== "upload" ?  <Hbutton name="LOGIN" link="/login"/> : null} */}
          
          {props.option== "login" ?  <Hbutton name="UPLOAD" link="/upload"/> : null}
      </div>
    </div>
  );
}
