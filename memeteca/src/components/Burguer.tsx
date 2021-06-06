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

      <div className="noir" style={{ display: visible ? "block" : "none" }}>
        <ul className="menuBlade"  onClick={()=> isVisible(false)}>
          <li> <Link to="/">HOME</Link> </li>
          <li> <Link to="/register">REGISTER</Link> </li>
          <li> <Link to="/">LOGIN</Link> </li>
          <li> <Link to="/">UPLOAD</Link> </li>
          <li> <Link to="/">CREATE MEME</Link> </li>
          <li> <Link to="/">PROFILE</Link> </li>
        </ul>
      </div>
    </>
  );
}
