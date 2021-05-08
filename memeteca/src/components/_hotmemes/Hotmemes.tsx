import React, {useState, useEffect, Props} from 'react'
import PropTypes, {InferProps} from "prop-types";
import Meme from "../_meme/Meme"
import axios from "axios"
const api_url = "http://localhost:4000/memes"


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
            await axios.get(api_url).then( (res) => {
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
        <div>
           {loadingMemes? <img alt="loading..." src={props.loader}></img>:
            memes.map( (meme) => {
              return  <Meme data={meme} key={meme.id} />           })}
        </div>
    )
}

type hotMemes = {
    loader: string 
}

