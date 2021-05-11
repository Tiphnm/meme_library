import React, { Key } from 'react'
import {newMeme} from  "../../typescript/types"
import './meme.css';

export default function Meme(props: newMeme) {
    return (
            <div className="container-main">
                    <div className="container-meme">
                    <img className= "meme" src={props.data.url}></img>
                        <div className="container-comment">
                            <button className="like_button">
                                <i className="far fa-thumbs-up fa-3x">
                                </i>
                            </button>
                            <button className="like_button">
                                <i className="far fa-thumbs-down fa-3x">
                                </i>
                            </button>
                        </div>
                    </div>
                </div>
    )
}
