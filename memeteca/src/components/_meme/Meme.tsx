import React, { Key } from 'react'
import {newMeme} from  "../../types/types"

export default function Meme(props: newMeme) {
    return (
        <div> 
            <p> {props.data.name}  </p> 
            <img src={props.data.url}></img>
        </div> 
    )
}
