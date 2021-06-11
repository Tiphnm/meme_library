import React from 'react'

// Interface for Content component
interface DisplayInterface {
    top: string;
    bottom: string;
    activeImage?: string;
    contentRef?: React.RefObject<any>;
  }

export default function DisplayGenerator(props: DisplayInterface) {
  console.log("ACTIVE IMAGE " + props.activeImage)
    return (
        <div className="content" ref={props.contentRef}>

        {/* Text at the top */}
        <h1>{props.top}</h1> 

        {/* Image preview */}ff
        <img src={props.activeImage} alt="Meme" className="meme-template" />
  
        {/* Text at the bottom     */}
        <h2>{props.bottom}</h2>
      </div>
    )
}
