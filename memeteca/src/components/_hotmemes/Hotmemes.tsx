import React, {useState, useEffect} from 'react'
/* Libs */ 
import dotenv from "dotenv"
import axios from "axios"
/* Components */ 
import Meme from "../_meme/Meme"
/* Assets */ 
import './_hotmemes.css';

/* Env vars */ 
dotenv.config()
const noenv: string = "CONFIGURE YOUR ENV VARS"
const environment = process.env.REACT_APP_ENV || noenv
const api_dev = process.env.REACT_APP_API_DEV || noenv
const api_prod ="https://memetecapi.azurewebsites.net/"

/* If the ENV environment is active then our api is in Localhost */ 
let api_url: string 
environment == "DEV"? (api_url = api_dev) : (api_url = api_prod)



type memeType = {
    _id: String,
    id: Number,
    name: String,
    url: String,
  };

export default function HotMemes (props: hotMemes) {
    const [loadingMemes, setLoadingMemes] = useState(true)
    const [memes, setMemes] = useState<any[]>([])
    
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
           {loadingMemes? <img className="hotmeme" alt="loading..." src={props.loader} ></img>: 
            memes.map( (meme) => {
              return  <Meme data={meme} key={meme._id}/>           })}
        </div>
    )
}

type hotMemes = {
    loader: string 
}

