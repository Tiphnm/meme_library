import React from 'react'
import meme from '../assets/img/troll.png'

export default function Header() {
    return (
        <div className="container-header">
                <div></div>
                <div className="center-header">
                    <img src={meme} alt="meme-img"/>
                    <div className="title-header">
                        <h1>MEMETECA</h1>
                    </div>
                </div>
                <div className="button-container">
                    <button className="button button1">UPLOAD
                    </button>
                    <button className="button button2">
                        REGISTER
                    </button>
                </div>
        </div>
    )
}
