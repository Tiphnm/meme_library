import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import meme from '../../assets/img/troll.png'


export default function Header(props: any) {
    return (
            <div className="container-header">
                <div className="center-header">
                 
                        <img src={meme} alt="meme-img"/>
                            <div className="title-header">
                            <a href="/">    <h1>MEMETECA</h1>  </a>
                            </div>
                  
                </div>

                {/*  Buttons  */}
                <div className="button-container">
                    <Link to="/upload">
                        <button className="button button1"> 
                            UPLOAD
                        </button>
                    </Link>
                        <button className="button button2">
                            REGISTER
                        </button>
                    <Link to="/login">
                        <button className="button button2">
                            LOGIN
                        </button>
                    </Link>
                    
                </div>
            </div>
    )

}
