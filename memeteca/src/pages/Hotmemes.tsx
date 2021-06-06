import React, {useState, useEffect} from 'react'
/* Libs */ 
import dotenv from "dotenv"
import axios from "axios"
/* Components */ 
import Meme from "./Meme"
import {newMeme} from "../typescript/types"
/* assets */
import loaderBlack from "../assets/img/loaderblack.gif"
import getApi from "../typescript/GetApi"

export default function HotMemes ({isLogged}: any) {
    const [loadingMemes, setLoadingMemes] = useState(true)
    const [memes, setMemes] = useState<newMeme[]>()
    
    useEffect(() => {
        async function getData()  {
            await axios.get(getApi()+"/memes").then( (res) => { /* api_url */ 
                // Check if the memes arrived

                setMemes(res.data)
                setLoadingMemes(false)
            })
        }
        if (loadingMemes) {
            getData()
        }

    }, [loadingMemes])

    return (
        <div >
           {loadingMemes? <img className="hotmeme" alt="loading..." src={loaderBlack} ></img>: 
            memes!.map(meme => <Meme data={meme} key={meme._id} canDelete={isLogged}/>)}

        </div>
    )
}
