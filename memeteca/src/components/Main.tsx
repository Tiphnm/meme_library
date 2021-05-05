import React from 'react'
import meme from '../assets/img/meme1.jpeg'
import troll from '../assets/img/troll.png'

export default function Main() {
    return (
        <>
            <div className="container">
                <div className="container-aside">
                    <h1>Popular</h1>
                    <ul>
                        <li>
                            <a >
                                <img src={troll} alt="meme-img" />My meme
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="container-main">
                    <div className="container-meme">
                        <h3 className="title-meme">My Meme</h3>
                        <img src={meme} alt="meme-img" />
                        <div className="container-comment">
                            <button>
                                <i className="far fa-thumbs-up fa-3x">
                                </i>
                            </button>
                            <button>
                                <i className="far fa-thumbs-down fa-3x">
                                </i>
                            </button>
                            <span>comments -</span>
                            <span className="span2">313 points</span>
                        </div>
                    </div>
                </div>
                <div className="container-last"></div>
            </div>
        </>
    )
}
