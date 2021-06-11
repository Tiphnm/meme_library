import React, {useState, useEffect, useRef} from 'react'
import ReactDOM from "react-dom"
import Axios from "axios"
import {template} from "../../typescript/types"
import Form from "./Form"
import DisplayGenerator from "./DisplayGenerator"
import Generated from "./Generated"

import "./style.css"
import axios from 'axios'

const memesApiUrl = "https://api.imgflip.com/get_memes"


export default function Create() {

  // Create refs
  let DisplayContainerRef = useRef<HTMLElement | null>(null)
  let GeneratedContainerRef = useRef<HTMLElement | null>(null)

  // Create useState hooks
  const [images, setImages] = useState([])
  const [activeImage, setActiveImage] = useState('')
  const [textTop, setTextTop] = useState('')
  const [textBottom, setTextBottom] = useState('')
  const [isMemeGenerated, setIsMemeGenerated] = useState(false)
  // ...

  async function fetchMemeLayouts(){
        const layoutMemes = await axios.get(memesApiUrl)
        const memes = await layoutMemes.data.data.memes
        
        setImages(await memes)
        setActiveImage(await memes[0].url)
        console.log(activeImage)
    }

    useEffect(() => {
        fetchMemeLayouts()
    }, [])


    return (
        <div className="create-container">

            <Form textTop={setTextTop} textBottom={setTextBottom} images={images} HandleActiveImage={setActiveImage}/>

            <DisplayGenerator top={textTop} bottom={textBottom} activeImage={activeImage} contentRef={DisplayContainerRef}/>

            <Generated resultContainerRef={GeneratedContainerRef}/>
        </div>
    )
}
