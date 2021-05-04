import React from 'react'
import meme from '../assets/img/troll.png'

export default function Header() {
    return (
        <div className="container-header">
            <header>
                <div>Hello</div>
                <div>
                    <img src={meme} alt="meme-img"/>
                </div>
                <div></div>
            </header>
        </div>
    )
}
