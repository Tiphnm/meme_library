import React, {useState, useEffect} from 'react'
/* Libs */ 
import dotenv from "dotenv"
import axios from "axios"
/* Components */ 
import Meme from "./Meme"
import {newMeme} from "../typescript/types"
/* assets */
import loaderBlack from "../assets/img/loaderblack.gif"

/* Env vars */ 
dotenv.config()

const api_dev = process.env.REACT_APP_API_DEV || "CONFIGURE YOUR ENV VARS"
const api_prod =  process.env.REACT_APP_API_PROD

/* If the ENV environment is active then our api is in Localhost */ 
const api_url = process.env.NODE_ENV == "development"?  api_dev : api_prod


export default function HotMemes () {
    console.log(process.env.NODE_ENV)
    const [loadingMemes, setLoadingMemes] = useState(true)
    const [memes, setMemes] = useState<newMeme[]>()
    
    useEffect(() => {
        async function getData()  {
            await axios.get(api_url+"/memes").then( (res) => { /* api_url */ 
                // Check if the memes arrived
                console.log(res.data)
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
              {console.log(loadingMemes)} 
              {console.log(memes)}
           {loadingMemes? <img className="hotmeme" alt="loading..." src={loaderBlack} ></img>: 
            memes!.map(meme => <Meme data={meme} key={meme._id}/>)}
            {console.log(memes)}
        </div>
    )
}

type hotMemes = {
    loader: string 
}

