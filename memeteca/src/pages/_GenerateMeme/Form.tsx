import React, {ReactEventHandler, useState} from 'react'
import {template} from "../../typescript/types"

// Interface for Form Component
interface FormInterface {
    isMemeGenerated?: boolean;
    textTop: React.Dispatch<string>
    textBottom: React.Dispatch<string>
    images: template[]
    HandleActiveImage: React.Dispatch<string>
    handleMemeGeneration?: () => void;
    handleMemeReset?: () => void;
  }

export default function Form(props: FormInterface) {

    function randomImage(images: template[]) {
        const random = Math.floor(Math.random() * images.length)
        const image = images[random]
        props.HandleActiveImage(image.url)
      }

      // Handle image upload via file input
    function handleImageInputChange(event: any) {
        props.HandleActiveImage(window.URL.createObjectURL(event.target.files[0]))
      }

    return (
   <>
            <h1>CREATE YOUR MEME</h1>
            <form className="form-create">

                <span className="group-inputs">
                    <label>TOP</label>
                    <input type="text"  placeholder="Text top" onChange={(e)=> props.textTop(e.target.value)}/>

                    <label>BOTTOM</label>
                    <input type="text"  placeholder="Text Bottom" onChange={(e)=> props.textBottom(e.target.value)}/>
                </span>
            
                <span className="group-btn">
                    <button className="btn-create" type="button" onClick={()=> randomImage(props.images)}>GET RANDOM IMG</button>

                    {/* Local IMG*/}
                    <label className="btn-create" htmlFor="fileInput">LOAD LOCAL IMG</label>
                    <input id="fileInput" name="fileInput" type="file" accept=".jpg, .jpeg, .png" onChange={handleImageInputChange} hidden />

                    {/* Print and generate the meme */}
                    <button className="btn-create danger" type="button"  onClick={props.handleMemeGeneration}>Generate</button>

                    {props.isMemeGenerated && <button className="btn-create" type="button"  onClick={props.handleMemeReset} >Reset</button>}
                </span>
                
            </form>
        </>
    )
}
