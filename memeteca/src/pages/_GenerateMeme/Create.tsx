import React, {useState, useEffect, useRef} from 'react'
import DomToImg from "dom-to-image-more"
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

  const [images, setImages] = useState([])
  const [activeImage, setActiveImage] = useState('')
  const [textTop, setTextTop] = useState('')
  const [textBottom, setTextBottom] = useState('')
  const [isMemeGenerated, setIsMemeGenerated] = useState(false)

 /* Fetch the empty Templates */
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

 /* Generate a IMG from to DOM  */
    function handleMemeGeneration() {
        // Remove any existing images
        if (GeneratedContainerRef.current!.childNodes.length > 0) {
          GeneratedContainerRef.current!.removeChild(GeneratedContainerRef.current!.childNodes[0])
        }
        
         // Generate meme image from the content of 'content' div
        DisplayContainerRef.current != null? DomToImg.toPng(DisplayContainerRef.current).then((dataUrl: string) => {
          // Create new image
          const img = new Image()
          // Use url of the generated image as src
          img.src = dataUrl
          img.className = "generated"
    
          // Append new image to DOM
          GeneratedContainerRef.current!.appendChild(img)
    
          // Update state for isMemeGenerated
          setIsMemeGenerated(true)
        }): ""
      }


  /* Reset generator/removing existing pictures */
  function handleMemeReset() {  
    if (GeneratedContainerRef != null) {
        GeneratedContainerRef.current!.removeChild(GeneratedContainerRef.current!.childNodes[0])
        setIsMemeGenerated(false)
    }}
  // ...

    return (
        <div className="create-container">

            <Form textTop={setTextTop} textBottom={setTextBottom} 
            images={images} HandleActiveImage={setActiveImage} 
            handleMemeGeneration={handleMemeGeneration}
            handleMemeReset={handleMemeReset}
            isMemeGenerated={isMemeGenerated}/>

            <DisplayGenerator top={textTop} bottom={textBottom} activeImage={activeImage} contentRef={DisplayContainerRef}/>

            <Generated GeneratedContainerRef={GeneratedContainerRef} isMemeGenerated={isMemeGenerated}/>
        </div>
    )
}
