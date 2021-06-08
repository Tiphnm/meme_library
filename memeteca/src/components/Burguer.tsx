import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Burguer() {
  const [visible, isVisible] = useState(false);

  return (
    <>
      <div className="burguer">
        <button className="menu-toggle" onClick={() => isVisible(true)}>
          <i className="fas fa-bars fa-2x"></i>
        </button>
      </div>

      <div className="noir" style={{ width: visible ? "100%" : "0" }}>
        <ul className="blade-menu"  onClick={()=> isVisible(false)}>
          <li> <Link to="/">HOME</Link> </li>
          <li> <Link to="/register">REGISTER</Link> </li>
          <li> <Link to="/login">LOGIN</Link> </li>
          <li> <Link to="/upload">UPLOAD</Link> </li>
          <li> <Link to="/create">CREATE MEME</Link> </li>
          <li> <Link to="/profile">PROFILE</Link> </li>
          <li> <Link to="/profile">LOGOUT</Link> </li>
        </ul>
      </div>
    </>
  );
}
