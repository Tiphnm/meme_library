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
const noenv: string = "CONFIGURE YOUR ENV VARS"
const environment = process.env.REACT_APP_ENV || noenv
const api_dev = process.env.REACT_APP_API_DEV || noenv
const api_prod ="https://memetecapi.azurewebsites.net/"

/* If the ENV environment is active then our api is in Localhost */ 
let api_url: string 
environment == "DEV"? (api_url = api_dev) : (api_url = api_prod)


export default function HotMemes () {
    const [loadingMemes, setLoadingMemes] = useState(true)
    const [memes, setMemes] = useState<newMeme[]>()
    
    useEffect(() => {
        async function getData()  {
            await axios.get(api_prod+"/memes").then( (res) => { /* api_url */ 
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
           {loadingMemes? <img className="hotmeme" alt="loading..." src={loaderBlack} ></img>: 
            memes!.map(meme => <Meme data={meme} key={meme._id}/>)}
            {console.log(memes)}
        </div>
    )
}

type hotMemes = {
    loader: string 
}

