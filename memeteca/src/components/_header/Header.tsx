import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import meme from '../../assets/img/troll.png'
import ButtonLogin from '../_buttonlogin/ButtonLogin'
import ButtonRegister from '../_buttonregister/ButtonRegister'
import ButtonUpload from '../_buttonupload/ButtonUpload'

export default function Header(props: any) {
    const getCurrentUrl = window.location.href
    console.log(getCurrentUrl);

    const setRegister = () => {
        return "register"
    }
    // const handleClick = () => {
    //     return 
    // }

    return (
        <>
            <div className="container-header">
                <div className="center-header">
                    <img src={meme} alt="meme-img" />
                    <div className="title-header" onClick={() => props.page = "home"}>
                        <a href="/">
                            <h1>MEMETECA</h1>
                        </a>
                    </div>
                </div>
                {/*  Buttons  */}
                <div className="button-container">
                    {(props.page == "login") ? <ButtonLogin /> : null}

                    <ButtonRegister />
                    <ButtonUpload />
                </div>
            </div>
        </>
    )

}