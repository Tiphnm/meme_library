// Import react, react-dom & dom-to-image-more
import * as React from 'react'
import { render } from 'react-dom'
import domtoimage from 'dom-to-image'
import Header from "../_header/Header"
//import domtoimage from 'dom-to-image'

// Import components
import Content from './Content'
import Form from './Form'
import Result from './Result'

// Import styles
import './style.css'

// App component
export default function Generator() {
  // Create refs
  let contentContainerRef = React.useRef<HTMLElement | null>(null)
  let resultContainerRef = React.useRef<HTMLElement | null>(null)

  // Create useState hooks
  const [images, setImages] = React.useState([])
  const [activeImage, setActiveImage] = React.useState('')
  const [textTop, setTextTop] = React.useState('')
  const [textBottom, setTextBottom] = React.useState('')
  const [isMemeGenerated, setIsMemeGenerated] = React.useState(false)

  // Fetch images from https://api.imgflip.com/get_memes
  async function fetchImage() {
    // Get the memes
    const imgData = await fetch('https://api.imgflip.com/get_memes').then(res => res.json()).catch(err => console.error(err))
    const { memes } = await imgData.data

    // Update images state
    await setImages(memes)

    // Update activeImage state
    await setActiveImage(memes[0].url)
  }

  // Handle input elements
  function handleInputChange(event: any) {
    if (event.target.name === 'text-top') {
      // Update textTop state
      setTextTop(event.target.value)
    } else {
      // Update textBottom state
      setTextBottom(event.target.value)
    }
  }

  // Choose random images from images fetched from api.imgflip.com
  function handleImageChange() {
    // Choose random image
    const image = images[Math.floor(Math.random() * images.length)]

    // Update activeImage state
    setActiveImage(image['url'])
  }

  // Handle image upload via file input
  function handleImageInputChange(event: any) {
    // Update activeImage state
    setActiveImage(window.URL.createObjectURL(event.target.files[0]))
  }

  // Handle meme generation
  function handleMemeGeneration() {

      // Remove any existing images
      resultContainerRef.current!.childNodes.length > 0?
      resultContainerRef.current!.removeChild(resultContainerRef.current!.childNodes[0]): null 
      
  
    // Generate meme image from the content of 'content' div
    domtoimage.toPng(contentContainerRef.current!).then((dataUrl) => {
      // Create new image
      const img = new Image()

      // Use url of the generated image as src
      img.src = dataUrl
      img.className = "img-result"
      // Append new image to DOM
      resultContainerRef.current!.appendChild(img)

      // Update state for isMemeGenerated
      setIsMemeGenerated(true)
    })
  }

  // Handle resetting the meme generator/removing existing pictures
  function handleMemeReset() {
    // Remove existing child node inside result container (generated meme image)
    resultContainerRef.current!.removeChild(resultContainerRef.current!.childNodes[0])

    // Update state for isMemeGenerated
    setIsMemeGenerated(false)
  }

  // Fetch images from https://api.imgflip.com/get_memes when app mounts
  React.useEffect(() => {
    // Call fetchImage method
    fetchImage()
  }, [])

  return (
    <>
    <Header option="home" />
    <div className="App">
      {/* Add Form component */}
      <Form
        textTop={textTop}
        textBottom={textBottom}
        handleImageInputChange={handleImageInputChange}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        handleMemeGeneration={handleMemeGeneration}
        handleMemeReset={handleMemeReset}
        isMemeGenerated={isMemeGenerated}
      />

      {/* Add Content component */}
      <Content
        activeImage={activeImage}
        contentContainerRef={contentContainerRef}
        textBottom={textBottom}
        textTop={textTop}
      />

      {/* Add Result component */}
      <Result resultContainerRef={resultContainerRef} />
    </div>
    </>
  )
}